import React from "react";
import { Breadcrumb,Card, Col, Row } from "react-bootstrap";
import GmailTreeView from "../../../shared/data/app/treeviewdata.js";
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
    <Seo title={"Reports"}/>
    {/* <!-- breadcrumb --> */}
    <div className="breadcrumb-header justify-content-between">
      <div className="left-content">
        <span className="main-content-title mg-b-0 mg-b-lg-1">리포트</span>
        <p>테스트 결과 및 분석 리포트를 확인하세요</p>
      </div>
      <div className="justify-content-center mt-2">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item className="breadcrumb-item tx-15" href="#!">
            메인메뉴
          </Breadcrumb.Item>
          <Breadcrumb.Item
            className="breadcrumb-item "
            active
            aria-current="page"
          >
            리포트
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
    {/* <!-- /breadcrumb --> */}

    {/* <!-- row --> */}
    <Row>
      <Col lg={6}>
        <Card>
          <Card.Header>
            <h4 className="card-title">테스트 카테고리</h4>
          </Card.Header>
          <Card.Body>
            <GmailTreeView />
          </Card.Body>
        </Card>
      </Col>
      <Col lg={6}>
        <Card>
          <Card.Header>
            <h4 className="card-title">리포트 요약</h4>
          </Card.Header>
          <Card.Body>
            <div className="p-3">
              <h5>테스트 실행 결과</h5>
              <p>총 테스트케이스: 248개</p>
              <p>통과: 186개 (75%)</p>
              <p>실패: 32개 (13%)</p>
              <p>스킵: 30개 (12%)</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    {/* <!-- row --> */}
  </div>
);

Treeview.propTypes = {};

Treeview.defaultProps = {};

Treeview.layout = "Contentlayout"

export default Treeview;
