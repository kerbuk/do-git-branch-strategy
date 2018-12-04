var graphConfig = new GitGraph.Template({
  colors: [ "#9993FF", "#47E8D4", "#6BDB52", "#F85BB5", "#FFA657", "#129de8","#e8ae11","#129de8"],
  branch: {
    color: "#000000",
    lineWidth: 3,
    spacingX: 60,
    mergeStyle: "straight",
    showLabel: true, // display branch names on graph
    labelFont: "normal 12pt Arial",
    labelRotation: 0
  },
  commit: {
    spacingY: -30,
    dot: {
      size: 8,
      strokeColor: "#000000",
      strokeWidth: 4
    },
    tag: {
      font: "normal 13pt Arial",
      color: "yellow"
    },
    message: {
      color: "black",
      font: "bold 12pt Arial",
      displayAuthor: false,
      displayBranch: false,
      displayHash: false,
    }
  },
  arrow: {
    size: 8,
    offset: 3
  }
});

var config = {
  template: graphConfig,
  mode: "extended",
  orientation: "horizontal"
};

var bugFixCommit = {
  messageAuthorDisplay: false,
  messageBranchDisplay: false,
  messageHashDisplay: false,
  message: "Bug fix commit(s)"
};

var stabilizationCommit = {
  messageAuthorDisplay: false,
  messageBranchDisplay: false,
  messageHashDisplay: false,
  message: "Release stabilization commit(s)"
};

var releaseCol = 0;
var masterCol = 1;
var devBranchCol = 2;
var developCol = 3;
var generalBranchCol = 4;
var generalCol = 5;
var saasBranchCol = 6;
var saasCol = 7;
var newGeneralBranchCol = 8;


var gitgraph = new GitGraph(config);

var master = gitgraph.branch({
  name: "master",
  column: masterCol
});
master.commit("Initial commit");

/*develop 브랜치  생성*/
var develop = gitgraph.branch({
  parentBranch: master,
  name: "develop",
  column: developCol
});
develop.commit("Initial commit");

/*general/2.5.5 브랜치  생성*/
var general = gitgraph.branch({
  parentBranch: master,
  name: "general/2.5.5",
  column: generalCol
});
general.commit("Initial commit");

/*2.5.3.1-saas 브랜치  생성*/
var saas = gitgraph.branch({
  parentBranch: master,
  name: "2.5.3.1-saas",
  column: saasCol
});
saas.commit("Initial commit");



/*develop브랜치의 feature 생성*/
var feature1 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/개선A",
  column: devBranchCol
});
feature1.commit("A기능 개선");
feature1.merge(develop);
develop.commit("commit");

/*develop브랜치의 feature 생성*/
var feature2 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/개선B",
  column: devBranchCol
});

////저....밑에서 머지할거임..

/*general 브랜치의 bugfix 생성*/
var bugfix1 = gitgraph.branch({
  parentBranch: general,
  name: "bugfix/고객사요청버그",
  column: generalBranchCol
});
bugfix1.commit("B버그 수정");
bugfix1.merge(general);

/*2.5.3.1-saas 브랜치의 bugfix 생성*/
var bugfix2 = gitgraph.branch({
  parentBranch: saas,
  name: "bugfix/사스요청버그",
  column: saasBranchCol
});
bugfix2.commit("사스버그 수정");
bugfix2.merge(saas);
saas.commit("");

/*월요일 정기머지*/
saas.merge(general,{
     message: "월요일 정기 머지(saas업데이트까지,10월중순)"
});
general.merge(develop,{
     message: "월요일 정기 머지"
});

general.commit("");
saas.commit("");

/*hotfix브랜치 생성 , 태그용*/
var hotfix1 = gitgraph.branch({
  parentBranch: general,
  name: "hotfix/2.5.5.2",
  column: generalBranchCol
});
hotfix1.commit("hotFix");
hotfix1.commit("버그C commit");
hotfix1.commit("버그D commit");
hotfix1.commit("버그E commit");
hotfix1.merge(general);
hotfix1.merge(develop);
develop.merge(master, {
  dotStrokeWidth: 10,
  message: "Release 2.5.5.2 tagged",
  tag: "tags/2.5.5.2"
});

feature2.commit("B기능 개선");
feature2.merge(develop);

general.commit("중간중간 수정");

/*2.5.3.1-saas 브랜치의 bugfix 생성*/
var bugfix3 = gitgraph.branch({
  parentBranch: saas,
  name: "bugfix/사스요청버그",
  column: saasBranchCol
});
bugfix3.commit("사스버그 수정");
bugfix3.merge(saas);

/*general 브랜치의 bugfix 생성*/
var bugfix4 = gitgraph.branch({
  parentBranch: general,
  name: "bugfix/고객사요청버그",
  column: generalBranchCol
});
bugfix4.commit("B버그 수정");
bugfix4.merge(general);

/*월요일 정기머지*/
saas.commit("11");
saas.merge(general,{
     message: "월요일 정기 머지(saas업데이트까지,10월중순)"
});
general.merge(develop,{
     message: "월요일 정기 머지"
});
general.commit("commit");

/* release 브랜치 생성 , 태그용용*/
var release = gitgraph.branch({
  parentBranch: general,
  name: "release/2.5.6.0",
  column: generalBranchCol
});

release.commit("butFix");
release.commit("버그F commit");
release.commit("버그G commit");
release.commit("버그H commit");
release.merge(develop);
develop.merge(master, {
  dotStrokeWidth: 10,
  message: "Release 2.5.6.0",
  tag: "tags/2.5.6.0"
});

saas.commit("committttttt");
develop.commit("committtt");
master.commit("committtt");

var general_2_5_6_0 = gitgraph.branch({
  name: "general/2.5.6",
  column: newGeneralBranchCol
});
general_2_5_6_0.commit("Initial commit");
general_2_5_6_0.commit("Initial commit2");
