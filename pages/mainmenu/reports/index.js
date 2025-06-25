import React from "react";
import { Breadcrumb,Card, Col, Row } from "react-bootstrap";

//Matterial ICONS
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
     <h1>리포트 페이지</h1>
    </Row>
    {/* <!-- row --> */}
  </div>
);

Treeview.propTypes = {};

Treeview.defaultProps = {};

Treeview.layout = "Contentlayout"

export default Treeview;
