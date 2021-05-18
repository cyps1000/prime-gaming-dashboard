/**
 * Imports Material UI Components
 */
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";

/**
 * Components Imports
 */
import Modal from "../Modal";
import ModalTitle from "../ModalTitle";
import ModalContent from "../ModalContent";

/**
 * Imports the component styles
 */
import { useStyles } from "./DashboardViewArticleModal.styles";

/**
 * Defines the props interface
 */
export interface DashboardViewArticleModalProps {
  onClose: () => void;
  open: boolean;
  title: string;
  author: string;
  content: string;
  comments: string;
  likes: string;
  shares: string;
}

/**
 * Displays the component
 */
const DashboardViewArticleModal: React.FC<DashboardViewArticleModalProps> = (
  props
) => {
  const { onClose, open, title, content, author, comments, likes, shares } =
    props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      scroll="paper"
      classes={{
        paper: classes.modal,
      }}
    >
      <ModalTitle
        onClick={onClose}
        classes={{
          container: classes.titleContainer,
          icon: classes.modalIcon,
        }}
      />
      <ModalContent>
        <Typography className={classes.title} variant="h3" gutterBottom>
          <DescriptionOutlinedIcon
            fontSize="large"
            className={classes.articleTitle}
          />
          {title}
        </Typography>
        <Divider className={classes.divider} />
        <Typography className={classes.author} variant="h5" gutterBottom>
          <CreateOutlinedIcon
            fontSize="small"
            color="secondary"
            className={classes.writtenBy}
          />
          {`Written by ${author}`}
        </Typography>
        <Typography className={classes.content} variant="h6">
          {content}
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.socials}>
          <Typography variant="h5">
            <FavoriteBorderOutlinedIcon
              fontSize="small"
              className={classes.likeButton}
            />
            {`Likes: ${likes}`}
          </Typography>
          <Typography variant="h5">
            <ShareOutlinedIcon
              fontSize="small"
              className={classes.shareButton}
            />
            {`Shares: ${shares}`}
          </Typography>
          <Typography variant="h5">
            <CommentOutlinedIcon
              fontSize="small"
              className={classes.commentButton}
            />
            {`Comments: ${comments}`}
          </Typography>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default DashboardViewArticleModal;
