import { getApiClient } from "../../utils/api";
import { useState, useEffect } from "react";

/**
 * Component Imports
 */
import DashboardViewArticleModal from "../DashboardViewArticleModal";
import PrimeTable from "../PrimeTable";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

/**
 * Imports the component styles
 */
import { useStyles } from "./DashboardArticles.styles";
import { TableRowData, TableColumnData } from "../DynamicTable";
import { useApiClient } from "../../hooks";

/**
 * Defines the Modals' State interface
 */
interface ModalState {
  viewArticleModal: boolean;
  editArticleModal: boolean;
  deleteArticleModal: boolean;
}

/**
 * Defines the props interface
 */
export interface DashboardArticlesProps {
  text?: string;
}

/**
 * Articles interface
 */
interface Article {
  id: string;
  title: string;
  author: {
    id: string;
    role: string;
    username: string;
  };
  content: string;
  comments: string;
  likes: string;
  shares: string;
}

/**
 * Displays the component
 */
const DashboardArticles: React.FC<DashboardArticlesProps> = (props) => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Init the loading state
   */
  const [loading, setLoading] = useState(true);

  /**
   * Initializes the Modal state
   */
  const [modals, setModals] = useState({
    viewArticleModal: false,
    editArticleModal: false,
    deleteArticleModal: false,
  } as ModalState);

  /**
   *
   */
  const [modalData, setModalData] = useState({
    title: "",
    content: "",
    author: "",
    comments: "",
    likes: "",
    shares: "",
  });

  /**
   * Defines the table columns
   */
  const tableColumns: TableColumnData[] = [
    {
      label: "Title",
      rowKey: "title",
      sort: true,
      searchField: true,
      style: {
        width: "40%",
        minWidth: "150px",
      },
    },
    {
      label: "Author",
      rowKey: "author",
      sort: true,
      searchField: true,
    },
    {
      label: "Comments",
      rowKey: "comments",
      sort: true,
    },
    {
      label: "Likes",
      rowKey: "likes",
      sort: true,
    },
    {
      label: "Shares",
      rowKey: "shares",
      sort: true,
    },
    {
      label: "Operations",
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
   * Handles opening the view Article Modal
   */
  const openViewArticleModal = (props: any) => {
    setModalData({ ...props });
    openModal("viewArticleModal");
  };

  /**
   * Handles opening the edit Article Modal
   */
  //const openEditArticleModal = () => openModal("editArticleModal");

  /**
   * Handles opening the delete Article Modal
   */
  //const openDeleteArticleModal = () => openModal("deleteArticleModal");

  /**
   * Handles closing the View/Edit/Delete Modal
   */
  const closeModal = () => {
    setModalData({
      title: "",
      content: "",
      author: "",
      comments: "",
      likes: "",
      shares: "",
    });
    setModals({
      viewArticleModal: false,
      editArticleModal: false,
      deleteArticleModal: false,
    });
  };

  const { apiClient } = useApiClient({ mock: false, withCredentials: true });

  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
    const { data } = await apiClient.get("/v1/articles?page=1&limit=50");
    const { items } = data;

    setArticles(items);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleBulkDelete = (data: TableRowData[]) => {
    const toDeleteIds = data.map((article) => article.id);
    const newArticles = articles.filter(
      (article) => !toDeleteIds.includes(article.id)
    );
    setArticles(newArticles);
  };

  const geTableRows = () => {
    return articles.map((article) => {
      const handleView = () => openViewArticleModal(article);

      return {
        ...article,
        comments: article.comments.length,
        likes: article.likes.length,
        shares: article.shares,
        author: article.author ? article.author.username : "",
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

  useEffect(() => {
    if (articles.length > 0) {
      setLoading(false);
    }
  }, [articles]);

  const handleAdd = () => console.log("articles:", articles);

  return (
    <div className={classes.root}>
      <Typography gutterBottom={true} className={classes.articlesTitle}>
        Articles
      </Typography>
      <PrimeTable
        loading={loading}
        columns={tableColumns}
        rows={geTableRows()}
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
        excludeSelectKeys={["operations"]}
        orderBy="age"
        order="desc"
      />
      <DashboardViewArticleModal
        {...modalData}
        onClose={closeModal}
        open={modals.viewArticleModal}
      />
    </div>
  );
};

export default DashboardArticles;
