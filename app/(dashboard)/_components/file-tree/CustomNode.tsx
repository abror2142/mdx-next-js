'use client'

import React from "react";
import TreeNode from "@/types/TreeNode";
import { TypeIcon } from "@/components/shared/TypeIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPen } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field } from "formik";
import { useTree } from "@/contexts/TreeContext";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import DeleteButton from "../buttons/DeleteButton";
import Link from "next/link";
import OutsideAlerter from "@/components/shared/OutsideAlerter";
import { cleanUrl } from "../../admin/editor/page";

type Props = {
  node: TreeNode;
  selectedItem: TreeNode | null;
  depth: number;
  isOpen: boolean;
  onToggle: (id: number | string) => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<TreeNode | null>>;
};

export const CustomNode: React.FC<Props> = (props) => {
  const { tree, setTree } = useTree();
  const indent = props.depth * 24;

  const handleToggleFile = (e: React.MouseEvent) => {
    e.stopPropagation();

    props.setSelectedItem(props.node); 
  };
  
  const handleToggleFolder = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    props.setSelectedItem(props.node); 
    props.onToggle(props.node.id);
  };

  const handleSubmit = async (name: string) => {
    setTree(prev =>
      prev.map(n =>
        n.id === props.node.id
          ? {
              ...n,
              text: name,
              data: {
                ...n.data,
                new: false,
                url: cleanUrl(name)
              },
            }
          : n
      )
    );
    props.setSelectedItem(tree.find(node => node.id === props.selectedItem?.id) || null)
  }

  return (
    <div
      className={`group relative tree-node rounded-sm component-bg-custom-hover flex `}
      style={{ paddingInlineStart: indent }}
      onClick={(e) => { props.node.droppable ? handleToggleFolder(e) : handleToggleFile(e);}
      }
    >
      <div className={`flex gap-1 rounded-sm py-1 px-2 w-full ${props.node?.data?.new && 'border border-blue-200 bg-blue-100'} $p`}>
        {
          props.node.droppable 
          && <div
              className={`expandIconWrapper text-sm ${
              props.isOpen ? "isOpen " : ""
              }`}
          >
              {props.node.droppable && (
              <div  className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faChevronRight} />
              </div>
              )}
          </div>
        }
        
        {props.node?.droppable ? null : <div className="expandIconWrapper"><TypeIcon fileType={props.node.data?.fileType} /></div>}
        
        <div className="flex">
          {
            props.node?.data?.new 
            ? props.node?.droppable 
              ? <Formik
                  initialValues={{ 
                      name: props.node.text || ""
                  }}
                  onSubmit={(values) => {
                      console.log(values);
                      handleSubmit(values.name)
                  }}
              >
                {({ values }) =>  (
                  <OutsideAlerter func={() => handleSubmit(values.name)}>
                      <Form className="grow-1 flex">                      
                        <Field name="name" autoFocus className="outline-none grow-1" placeholder="Folder Name"/>
                      </Form>
                  </OutsideAlerter>
                )}
              </Formik>
              : <Formik
                  initialValues={{ 
                      name: tree.find(item => item.id == props.node.id)?.text || ""
                  }}
                  enableReinitialize
                  onSubmit={(values) => {
                      console.log(values);
                      handleSubmit(values.name)
                  }}
              >
                {({ values }) =>  (
                  <OutsideAlerter func={() => handleSubmit(values.name)}>
                      <Form className="grow-1 flex">                      
                        <Field name="name" autoFocus className="outline-none grow-1" placeholder="File Name"/>
                      </Form>
                  </OutsideAlerter>
                )}
              </Formik>
            : <p className={`${!props.node.data?.published && 'text-gray-300'}`}>{`${props.node.text}`}</p>
          }
        </div>
      </div>
      <div className="absolute hidden text-base group-hover:flex items-center px-2 gap-2 right-0 bg-gray-100 rounded-s-full">
        <Link href={`/admin/guides/${props.node.id}`}>
            <FontAwesomeIcon icon={faEye} className="text-gray-500 hover:text-gray-600 cursor-pointer"/>
        </Link>
        <Link href={`/admin/editor?id=${props.node.id}`}>
          <FontAwesomeIcon icon={faPen} className="text-blue-500 hover:text-blue-600 cursor-pointer"/>
        </Link>
        <DeleteButton node={props.node} iconOnly />
      </div>
    </div>
  );
};
