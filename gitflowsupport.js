var graphConfig = new GitGraph.Template({
  colors: [ "#9993FF", "#47E8D4", "#6BDB52", "#F85BB5", "#FFA657", "#F85BB5" ],
  branch: {
    color: "#000000",
    lineWidth: 3,
    spacingX: 60,
    mergeStyle: "straight",
    showLabel: true, // display branch names on graph
    labelFont: "normal 10pt Arial",
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
      font: "normal 10pt Arial",
      color: "yellow"
    },
    message: {
      color: "black",
      font: "normal 12pt Arial",
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

// You can manually fix columns to control the display.
/*var featureCol = 0;
var developCol = 1;
var releaseCol = 2;
var supportCol = 3;
var support2Col = 5;
var masterCol = 4;*/

var releaseCol = 0;
var masterCol = 1;
var devBranchCol = 2;
var developCol = 3;
var generalBranchCol = 4;
var generalCol = 5;
var saasBranchCol = 6;
var saasCol = 7;


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

/*general 브랜치의 bugfix 생성*/
var bugfix1 = gitgraph.branch({
  parentBranch: general,
  name: "bugfix/버그B",
  column: generalBranchCol
});
bugfix1.commit("B버그 수정");
bugfix1.merge(general);

/*hotfix브랜치 생성 , 태그용*/
var hotfix1 = gitgraph.branch({
  parentBranch: general,
  name: "hotfix/2.5.5.2",
  column: generalBranchCol
});
hotfix1.commit("hotFix");
hotfix1.commit("버그C commit");
hotfix1.merge(general);
hotfix1.merge(develop);
hotfix1.merge(master, {
  dotStrokeWidth: 10,
  message: "Release 2.5.5.2 tagged",
  tag: "tags/2.5.5.2"
});




/*
var feature1 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/1",
  column: featureCol
});
feature1.commit("A feature to go into v1.0.0").commit({
  messageDisplay: false
});
feature1.merge(develop);

var feature2 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/2",
  column: featureCol
});
feature2.commit("Another feature to go into v1.0.0").commit({
  messageDisplay: false
});
feature2.merge(develop);

var release_100 = gitgraph.branch({
  parentBranch: develop,
  name: "release/v1.0.0",
  column: releaseCol
});
release_100.commit({
  message: "Start v1.0.0-rc Release Candidate builds",
  tag: "v1.0.0-rc",
  tagColor: 'gray'
});
develop.commit({
  messageDisplay: false
});
release_100.commit(stabilizationCommit);
release_100.merge(master, {
  dotStrokeWidth: 10,
  message: "Release v1.0.0 tagged",
  tag: "v1.0.0"
});
master.merge(develop);

var support_10x = gitgraph.branch({
  parentBranch: master,
  name: "support/v1.0.x",
  column: supportCol
});

support_10x.commit({
  message: "Start v1.0.1-rc Release Candidate builds",
  tag: "v1.0.1-rc",
  tagColor: 'gray'
}).commit(bugFixCommit);
develop.commit({
  messageDisplay: false
});

var feature3 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/3",
  column: featureCol
});

feature3.commit("A feature to go into v1.1.0").commit({
  messageDisplay: false
});
feature3.merge(develop);

support_10x.commit({
  dotStrokeWidth: 10,
  message: "Release v1.0.1 tagged",
  tag: "v1.0.1"
}).merge(develop);

develop.commit({
  messageDisplay: false
});
support_10x.commit({
  message: "Start v1.0.2-rc Release Candidate builds",
  tag: "v1.0.2-rc",
  tagColor: 'gray'
})
support_10x.commit(bugFixCommit).commit({
  dotStrokeWidth: 10,
  message: "Release v1.0.2 tagged",
  tag: 'v1.0.2'
});
support_10x.merge(develop);
develop.commit({
  messageDisplay: false
});

var release_110 = gitgraph.branch({
  parentBranch: develop,
  name: "release/v1.1.0",
  column: releaseCol
});
release_110.commit({
  message: "Start v1.1.0-rc Release Candidate builds",
  tag: "v1.1.0-rc",
  tagColor: 'gray'
})
release_110.commit(stabilizationCommit);
release_110.merge(master, {
  dotStrokeWidth: 10,
  message: "Release v1.1.0 tagged",
  tag: "v1.1.0"
});
master.merge(develop);

var support_11x = gitgraph.branch({
  parentBranch: master,
  name: "support/v1.1.x",
  column: supportCol
});
support_11x.commit({
  message: "Start v1.1.1-rc Release Candidate builds",
  tag: "v1.1.1-rc",
  tagColor: 'gray'
})
support_11x.commit(bugFixCommit).commit({
  dotStrokeWidth: 10,
  message: "Release v1.1.1 tagged",
  tag: "v1.1.1"
});
support_11x.merge(develop);
develop.commit({
  messageDisplay: false
});

var feature4 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/4",
  column: featureCol
});
develop.commit({
  messageDisplay: false
});
feature4.commit("A feature to go into v2.0.0").commit({
  messageDisplay: false
});
feature4.merge(develop);

support_11x.commit({
  message: "Start v1.1.2-rc Release Candidate builds",
  tag: "v1.1.2-rc",
  tagColor: 'gray'
})
support_11x.commit(bugFixCommit).commit({
  dotStrokeWidth: 10,
  message: "Release v1.1.2",
  tag: "v1.1.2"
});
support_11x.merge(develop);
develop.commit({
  messageDisplay: false
});

var feature5 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/5",
  column: featureCol
});
develop.commit({
  messageDisplay: false
});
feature5.commit("Another feature to go into v1.2.0").commit({
  messageDisplay: false
});
feature5.merge(develop);

develop.commit({
  messageDisplay: false
});

var release_200 = gitgraph.branch({
  parentBranch: develop,
  name: "release/v2.0.0",
  column: releaseCol
});
release_200.commit({
  message: "Start v2.0.0-rc Release Candidate builds",
  tag: "v2.0.0-rc",
  tagColor: 'gray'
})
release_200.commit(stabilizationCommit);
release_200.merge(master, {
  dotStrokeWidth: 10,
  message: "Release v2.0.0 tagged",
  tag: "v2.0.0"
});
master.merge(develop);
develop.commit({
  messageDisplay: false
});
support_11x.commit({
  message: "Release v1.1.3-rc tagged",
  tag: "1.1.3-rc",
  tagColor: 'gray'
});

var feature6 = gitgraph.branch({
  parentBranch: develop,
  name: "feature/6",
  column: featureCol
});
feature6.commit("Feature to go into v2.0.0").commit({
  messageDisplay: false
});
var support_20x = gitgraph.branch({
  parentBranch: master,
  name: "support/v2.0.x",
  column: support2Col
});
support_20x.commit({
  message: "Release v2.0.1-rc tagged",
  tag: "v2.0.1-rc",
  tagColor: 'gray'
});
support_20x.commit().commit({
  dotStrokeWidth: 10,
  message: "Release v2.0.1 tagged",
  tag: "v2.0.1"
});
support_20x.merge(develop);
support_11x.commit();
support_11x.commit({
  dotStrokeWidth: 10,
  message: "Release v1.1.3 tagged",
  tag: "v1.1.3"
});
feature6.merge(develop);

var release_210 = gitgraph.branch({
  parentBranch: develop,
  name: "release/v2.1.0",
  column: releaseCol
});
release_210.commit({
  message: "Start v2.1.0-rc Release Candidate builds",
  tag: "v2.1.0-rc",
  tagColor: 'gray'
})
release_210.commit(stabilizationCommit);
release_210.merge(master, {
  dotStrokeWidth: 10,
  message: "Release v2.1.0 tagged",
  tag: "v2.1.0"
});
master.merge(develop);*/
