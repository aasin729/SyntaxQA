import React from "react";
import { Breadcrumb,Card, Col, Row } from "react-bootstrap";
import GmailTreeView from "../../../shared/data/app/treeviewdata";
import TreeView from '@mui/lab/TreeView'; 

//Matterial ICONS
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Seo from "@/shared/layout-components/seo/seo";

const Treeview = () => (
  <div>
    <Seo title={"Treeview"}/>
    {/* <!-- breadcrumb --> */}
    <div className="breadcrumb-header justify-content-between">
      <div className="left-content">
        <span className="main-content-title mg-b-0 mg-b-lg-1">TREEVIEW</span>
      </div>
      <div className="justify-content-center mt-2">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item className="breadcrumb-item tx-15" href="#!">
            Apps
          </Breadcrumb.Item>
          <Breadcrumb.Item
            className="breadcrumb-item "
            active
            aria-current="page"
          >
            Treeview
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
    {/* <!-- /breadcrumb --> */}

    {/* <!-- row --> */}
    <h1>백 오피스</h1>
    {/* <!-- row --> */}
  </div>
);

Treeview.propTypes = {};

Treeview.defaultProps = {};

Treeview.layout = "Contentlayout"

export default Treeview;
