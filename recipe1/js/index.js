(function () {
  // string template for a recipe
  var recipe = `<div class="panel panel-default" id="fold@num@">
            <div class="panel-heading" role="tab" id="heading@num@">
                <h4 class="panel-title">
                    <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse@num@" aria-expanded="false" aria-controls="collapse@num@">
                        @itemName@
                    </a>
                </h4>
            </div>
            <div id="collapse@num@" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading@num@">
                <div class="panel-body">
                        <ul class="list-group">
                            @items@
                        </ul>
                </div>
                <div class="panel-footer">
                    <button class="btn btn-info" data-click="edit" data-num="@num@">Edit</button>
                    <button class="btn btn-danger" data-click="del" data-num="@num@">Delete</button>
                </div>
            </div>
        </div>`;

  // general code
  function trim(n) {
    return n.replace(/^\s+/, "").replace(/\s+$/, "");
  }

  var app = {
    // functionaliy for the app
    editing: false,
    num: -1,
    methods: {
      edit: function (ev) {
        //alert("edit recipe #" + ev.target.getAttribute("data-num"))
        app.num = ev.target.getAttribute("data-num");
        app.editing = true;
        viz.fillModal(app.store, app.num);
        viz.showModal();
      },
      del: function (ev) {
        //alert("delete recipe #" + ev.target.getAttribute("data-num"))
        app.num = ev.target.getAttribute("data-num");
        var item = trim($("#fold" + app.num + ">div>h4>a").text());
        delete app.store[item];
        viz.deleteItem(app.num);
        persist.save(app.store);
        app.num = -1;
      },
      save: function (ev) {
        if (app.editing) {
          app.editing = false;
          var item = trim($("#recipeName").val());
          app.store[item] = trim($("#ingredients").val().replace(/\n/g, ","));
          viz.update(app.store, app.num, item);
          persist.save(app.store);
          app.num = -1;
        } else {
          var item = trim($("#recipeName").val());
          if (app.store[item]) {
            // do not overwrite - use edit/delete
            alert(
              "Sorry but ** " +
                item +
                " ** already exists.\nTry using its Edit/Delete buttons."
            );
            return;
          }
          app.store[item] = trim($("#ingredients").val().replace(/\n/g, ","));
          persist.save(app.store);
          viz.addItem(app.store, item);
        }
        viz.hideModal();
      },
      addItem: function () {
        viz.clearModal();
        viz.showModal();
      },
    },
    runAppMethod: function (ev, method) {
      app.methods[method](ev);
    },
    clearStore: function () {
      app.store = {};
    },
    store: {},
  };

  var viz = {
    // functional visuals for app
    update: function (store, n, name) {
      $("#fold" + n + ">div>h4>a").text(name);
      $("#fold" + n + ">div>div>ul").html(
        store[name]
          .split(/,/g)
          .map(function (val) {
            return `<li class="list-group-item">${val}</li>`;
          })
          .join("")
      );
    },
    fillModal: function (store, n) {
      var item = trim($("#fold" + n + ">div>h4>a").text());
      $("#recipeName").val(item);
      $("#ingredients").val(store[item].replace(/,/g, "\n"));
    },
    showModal: function () {
      $("#myModal").modal("show");
    },
    hideModal: function () {
      $("#myModal").modal("hide");
    },
    clearModal: function () {
      $("#recipeName").val("");
      $("#ingredients").val("");
    },
    addItem: function (store, name) {
      createRecipe(name, store[name], document.querySelector("#accordion"));
      addDataClickEvents();
    },
    deleteItem: function (n) {
      $("#fold" + n).replaceWith("");
    },
    clearAll: function () {
      $("#accordion").html("");
    },
  };

  var addDataClickEvents = function () {
    // adds onclick to elments with a data-click attribute
    var b = document.querySelectorAll("button");
    var arr = Array.prototype.slice.call(b);
    arr.forEach(function (n) {
      (function (n) {
        var method = n.getAttribute("data-click");
        if (method != null && app.methods[method]) {
          n.onclick = function (ev) {
            app.runAppMethod(ev, method);
          };
        }
      })(n);
    });
  };

  // recipe specific code
  function makeRecipes() {
    // transpiles custom elements into standard html5
    var r = document.getElementsByTagName("recipe");
    for (var i = 0; i < r.length; i++) {
      var a = r[i];
      var name = a.getAttribute("name");
      var ingredients = a.getAttribute("ingredients").split(/,/g);
      var n = recipe
        .replace(/@num@/g, makeRecipes.index)
        .replace(/@itemName@/, name)
        .replace(
          /@items@/,
          ingredients
            .map(function (val) {
              return `<li class="list-group-item">${val}</li>`;
            })
            .join("")
        );
      var d = document.createElement("div");
      d.innerHTML = n;
      a.parentNode.replaceChild(d, a);
      makeRecipes.index++;
    }
  }
  makeRecipes.index = 0;

  function createRecipe(name, ingredients, el) {
    // creates a custom element
    var r = document.createElement("recipe");
    r.setAttribute("name", name);
    r.setAttribute("ingredients", ingredients);
    el.appendChild(r);
    makeRecipes();
  }

  function showRecipes(store) {
    // tranlates stored data into custom elements
    for (var i in store) {
      createRecipe(i, store[i], document.querySelector("#accordion"));
    }
    addDataClickEvents();
  }

  $(".clearall").click(function () {
    app.clearStore();
    persist.clear();
    viz.clearAll();
  });

  var persist = {
    load: function () {
      var s = localStorage.getItem(options.storageKey);
      if (s == null || s == "undefined") {
        //optional is return {}
        return {
          Spaghetti:
            "Angel Hair Spaghetti,Ragu Chunky Garden Spagehtti Sauce,Parmesan Cheeese,Meat Balls (optional),French Bread,Garden Fresh Salad",
          "Meat Loaf":
            "Hamburger,Red and Green Bell Peppers, Onion, French-Cut Green Beans,Mashed Potatos",
        };
      }
      return JSON.parse(s);
    },
    save: function (ob) {
      localStorage.setItem(options.storageKey, JSON.stringify(ob));
    },
    clear: function () {
      localStorage.removeItem(options.storageKey);
    },
  };

  var options = {
    storageKey: "_rdspoons_recipes",
  };

  app.store = persist.load();
  showRecipes(app.store);
})();
