/**
 * Imports Material UI Components
 */
import Typography from "@material-ui/core/Typography";

/**
 * Components Imports
 */
import Modal from "../Modal";
import ModalTitle from "../ModalTitle";
import ModalContent from "../ModalContent";

/**
 * Imports Material UI components
 */
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

/**
 * Imports the component styles
 */
import { useStyles } from "./DashboardViewAccountModal.styles";

/**
 * Defines the props interface
 */
export interface DashboardViewAccountModalProps {
  onClose: () => void;
  open: boolean;
  name: string;
  email: string;
}

/**
 * Displays the component
 */
const DashboardViewAccountModal: React.FC<DashboardViewAccountModalProps> = (
  props
) => {
  const { onClose, open, name, email } = props;

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
        <Typography className={classes.userTitle} variant="h3">
          <AccountCircleOutlinedIcon
            fontSize="large"
            className={classes.userTitleIcon}
          />
          User Information
        </Typography>
        <Divider className={classes.divider} />
        <Container className={classes.container}>
          <Typography className={classes.userName} variant="h5" gutterBottom>
            {`Name: ${name}`}
          </Typography>
          <Typography className={classes.email} variant="h5" gutterBottom>
            {`Email address: ${email}`}
          </Typography>
          <Typography className={classes.email} variant="h5" gutterBottom>
            {`Joined: ${new Date().toUTCString()}`}
          </Typography>
          <Typography className={classes.reports} variant="h5" gutterBottom>
            Reports: 0
          </Typography>
          <Typography className={classes.comments} variant="h5" gutterBottom>
            Comments: 67
          </Typography>
          <Typography className={classes.articles} variant="h5" gutterBottom>
            <ul>
              <li>Article Title - No. 1 Test</li>
              <li>Article Title - No. 2 Test</li>
              <li>Article Title - No. 3 Test</li>
              <li>Article Title - No. 4 Test</li>
              <li>Article Title - No. 5 Test</li>
            </ul>
          </Typography>
        </Container>
      </ModalContent>
    </Modal>
  );
};

export default DashboardViewAccountModal;
