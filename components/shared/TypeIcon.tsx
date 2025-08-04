import { faFileText, faImage,  faFile } from "@fortawesome/free-regular-svg-icons";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  fileType?: string;
};

export const TypeIcon: React.FC<Props> = (props) => {

  switch (props.fileType) {
    case "image":
      return <FontAwesomeIcon icon={faImage} />;
    case "csv":
      return <FontAwesomeIcon icon={faFileCsv} />;
    case "text":
      return <FontAwesomeIcon icon={faFileText} />;
    default:
      return <FontAwesomeIcon icon={faFile} />; 
  }
};
