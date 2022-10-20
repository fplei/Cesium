// import Vue from "vue";

export function loadmore_for_elselect(app) {
  app.directive("el-select-loadmore", {
    beforeMount(el, binding) {
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM =
        el.querySelector(".el-select-dropdown .el-select-dropdown__wrap") || el;
      if (SELECTWRAP_DOM) {
        SELECTWRAP_DOM.addEventListener("scroll", function () {
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight + 2;
          if (condition) {
            binding.value();
          }
        });
      }
    },
  });
}

// Vue.directive("el-select-loadmore", {
//   bind(el, binding) {
//     // 获取element-ui定义好的scroll盒子
//     const SELECTWRAP_DOM = el.querySelector(
//       ".el-select-dropdown .el-select-dropdown__wrap"
//     );
//     debugger;
//     SELECTWRAP_DOM.addEventListener("scroll", function () {
//       const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
//       debugger;

//       if (condition) {
//         binding.value();
//       }
//     });
//   },
// });

// table 自适应宽度

export function fit_columns(app) {
  app.directive("fit-columns", {
    beforeMount(el, binding) {
      debugger;
      setTimeout(() => {
        adjustColumnWidth(el);
        // binding.value();
      }, 300);
    },
    updated(el) {
      debugger;
      el.classList.add("r-table");
      setTimeout(() => {
        adjustColumnWidth(el);
      }, 300);
    },
  });
}
function adjustColumnWidth(table) {
  const colgroup = table.querySelector("colgroup");
  const colDefs = [...colgroup.querySelectorAll("col")];
  colDefs.forEach((col) => {
    const clsName = col.getAttribute("name");
    const cells = [
      ...table.querySelectorAll(`td.${clsName}`),
      ...table.querySelectorAll(`th.${clsName}`),
    ];
    // 忽略加了"leave-alone"类的列
    if (cells[0]?.classList?.contains?.("leave-alone")) {
      return;
    }
    const widthList = cells.map((el) => {
      return el.querySelector(".cell")?.scrollWidth || 0;
    });
    const max = Math.max(...widthList);
    const padding = 32;
    table.querySelectorAll(`col[name=${clsName}]`).forEach((el) => {
      el.setAttribute("width", max + padding);
    });
  });
}
