import { getApiClient } from "../../utils/api";
import { useState, useEffect } from "react";

/**
 * Imports Components
 */
import DashboardViewAccountModal from "../DashboardViewAccountModal";
import { TableRowData } from "../DynamicTable/DynamicTable";
import PrimeTable from "../PrimeTable";

/**
 * Imports Material UI components
 */
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

/**
 * Imports the component styles
 */
import { useStyles } from "./DashboardAccounts.styles";

/**
 * Defines the Users interface
 */
interface User {
  id: string;
  email: string;
  name: string;
}

/**
 * Defines the Modals' State interface
 */
interface ModalState {
  viewUserModal: boolean;
  editUserModal: boolean;
  deleteUserModal: boolean;
}

/**
 * Displays the component
 */
const DashboardAccounts: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Init the loading state
   */
  const [loading, setLoading] = useState(true);

  /**
   * Init the modal state
   */
  const [modals, setModals] = useState({
    viewUserModal: false,
    editUserModal: false,
    deleteUserModal: false,
  } as ModalState);

  /**
   * Init the modal data state
   */
  const [modalData, setModalData] = useState({
    name: "",
    email: "",
  });

  /**
   * Defined the table columns
   */
  const tableColumns = [
    {
      label: "Name",
      rowKey: "name",
      sort: true,
      searchField: true,
    },
    {
      label: "Email",
      rowKey: "email",
      sort: true,
      searchField: true,
    },
    {
      labe: "Operations",
      rowKey: "operations",
    },
  ];

  /**
   * Handles opening the modal
   */
  const openModal = (modalType: string) => {
    setModals((prevState) => {
      return { ...prevState, [modalType]: true };
    });
  };

  /**
   * Handles opening the view User Modal
   */
  const openViewUserModal = (props: any) => {
    setModalData({ ...props });
    openModal("viewUserModal");
  };

  /**
   * Handles closing the View/Edit/Delete Modal
   */
  const closeModal = () => {
    setModalData({
      name: "",
      email: "",
    });
    setModals({
      viewUserModal: false,
      editUserModal: false,
      deleteUserModal: false,
    });
  };

  /**
   * Initializes the mock API
   */
  const { apiClient } = getApiClient({ mock: true });

  /**
   * Initialized the users state
   */
  const [users, setUsers] = useState<User[]>([]);

  /**
   * Handles fetching the user data
   */
  const fetchUsers = async () => {
    const { data } = await apiClient.get("/v1/users");
    const { users }: { users: User[] } = data;

    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Handles deleting multiple users at once
   */
  const handleBulkDelete = (data: TableRowData[]) => {
    console.log("Deleting users: ", data);
    const toDeleteIds = data.map((user) => user.id);
    const newUsers = users.filter((user) => !toDeleteIds.includes(user.id));
    setUsers(newUsers);
  };

  /**
   * Gets Users rows
   */
  const getTableRows = () => {
    return users.map((user) => {
      const handleView = () => openViewUserModal(user);

      return {
        ...user,
        operations: (
          <div className={classes.operations}>
            <IconButton
              size="small"
              edge="start"
              onClick={handleView}
              className={classes.viewBtn}
            >
              <VisibilityOutlinedIcon />
            </IconButton>
            <IconButton size="small" edge="start" className={classes.editBtn}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton size="small" edge="start" className={classes.deleteBtn}>
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </div>
        ),
      };
    });
  };

  /**
   * Inits the timer after which the Users appear
   */
  useEffect(() => {
    if (users.length > 0) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [users]);

  const handleAdd = () => console.log("users:", users);

  return (
    <div className={classes.root}>
      <Typography gutterBottom={true} className={classes.usersTitle}>
        Accounts
      </Typography>
      <PrimeTable
        loading={loading}
        columns={tableColumns}
        rows={getTableRows()}
        onAdd={handleAdd}
        onBulkDelete={handleBulkDelete}
        plugins={[
          "withSort",
          "withCount",
          "withSearch",
          "withStats",
          "withAdd",
          "withBulkDelete",
        ]}
        selectKey="id"
        excluseSelectKeys={["operations"]}
        orderBy="age"
        order="desc"
      />
      <DashboardViewAccountModal
        {...modalData}
        onClose={closeModal}
        open={modals.viewUserModal}
      />
    </div>
  );
};

export default DashboardAccounts;
