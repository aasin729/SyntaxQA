export const MENUITEMS = [
    {
      menutitle: "메인메뉴",
      Items: [
        {
          title: "메인메뉴",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="side-menu__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z" />
            </svg>
          ),
          type: "sub",
          selected:false,
          active:false,
          children: [
            {
              path: `/mainmenu/dashboard`,
              type: "link",
              active:false,
              selected:false,
              title: "대시보드",
            },
            {
              path: `/mainmenu/testcase`,
              type: "link",
              active:false,
              selected:false,
              title: "테스트케이스",
            },
            {
              path: `/mainmenu/runatest`,
              type: "link",
              active:false,
              selected:false,
              title: "테스트 실행",
            },
            {
              path: `/mainmenu/IssueManage`,
              type: "link",
              active:false,
              selected:false,
              title: "이슈 관리",
            },
            {
              path: `/mainmenu/reports`,
              type: "link",
              active:false,
              selected:false,
              title: "리포트",
            },
          ],
        },
      ],
    },
  
    {
      menutitle: "프로젝트",
      Items: [
        {
          title: "프로젝트",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="side-menu__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
            </svg>
          ),
          type: "sub",
          selected:false,
          active:false,
          children: [
            {
              path: `/project/mobileapp`,
              type: "link",
              active:false,
              selected:false,
              title: "모바일 앱",
            },
            {
              path: `/project/webservice`,
              type: "link",
              active:false,
              selected:false,
              title: "웹 서비스",
            },
            {
              path: `/project/backoffice`,
              type: "link",
              active:false,
              selected:false,
              title: "백오피스",
            },
          ],
        },
      ],
    },
    {
      menutitle: "설정",
      Items: [
        {
          title: "설정",
          icon: (
             <svg
              xmlns="http://www.w3.org/2000/svg"
              className="side-menu__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M22 7.999a1 1 0 0 0-.516-.874l-9.022-5a1.003 1.003 0 0 0-.968 0l-8.978 4.96a1 1 0 0 0-.003 1.748l9.022 5.04a.995.995 0 0 0 .973.001l8.978-5A1 1 0 0 0 22 7.999zm-9.977 3.855L5.06 7.965l6.917-3.822 6.964 3.859-6.918 3.852z" />
              <path d="M20.515 11.126 12 15.856l-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.97-1.748z" />
              <path d="M20.515 15.126 12 19.856l-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.97-1.748z" />
            </svg>
          ),
          type: "sub",
          selected:false,
          active:false,
          children: [
            {
              path: `/settings/teamManage`,
              title: "팀 관리",
              type: "link",
              active:false,
              selected:false,
            },
            {
              path: `/settings/environment`,
              title: "환경 설정",
              type: "link",
              active:false,
              selected:false,
            },
          ],
        },
      ],
    },
  ];
  