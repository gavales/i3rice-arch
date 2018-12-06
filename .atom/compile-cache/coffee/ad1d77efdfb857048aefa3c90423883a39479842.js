(function() {
  var slice = [].slice;

  module.exports = {
    activatePackages: function() {
      var activationPromise, packages, workspaceElement;
      workspaceElement = atom.views.getView(atom.workspace);
      packages = ['atom-latex'];
      activationPromise = Promise.all(packages.map(function(pkg) {
        return atom.packages.activatePackage(pkg);
      }));
      atom_latex.lazyLoad();
      return activationPromise;
    },
    setConfig: function(keyPath, value) {
      var base;
      if (this.originalConfigs == null) {
        this.originalConfigs = {};
      }
      if ((base = this.originalConfigs)[keyPath] == null) {
        base[keyPath] = atom.config.get(keyPath);
      }
      return atom.config.set(keyPath, value);
    },
    unsetConfig: function(keyPath) {
      var base;
      if (this.originalConfigs == null) {
        this.originalConfigs = {};
      }
      if ((base = this.originalConfigs)[keyPath] == null) {
        base[keyPath] = atom.config.get(keyPath);
      }
      return atom.config.unset(keyPath);
    },
    restoreConfigs: function() {
      var keyPath, ref, results, value;
      if (this.originalConfigs) {
        ref = this.originalConfigs;
        results = [];
        for (keyPath in ref) {
          value = ref[keyPath];
          results.push(atom.config.set(keyPath, value));
        }
        return results;
      }
    },
    callAsync: function(timeout, async, next) {
      var done, nextArgs, ref;
      if (typeof timeout === 'function') {
        ref = [timeout, async], async = ref[0], next = ref[1];
        timeout = 5000;
      }
      done = false;
      nextArgs = null;
      runs(function() {
        return async(function() {
          var args;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          done = true;
          return nextArgs = args;
        });
      });
      waitsFor(function() {
        return done;
      }, null, timeout);
      if (next != null) {
        return runs(function() {
          return next.apply(this, nextArgs);
        });
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L3NwZWMvaGVscGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLGdCQUFBLEVBQWtCLFNBQUE7QUFDaEIsVUFBQTtNQUFBLGdCQUFBLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFJLENBQUMsU0FBeEI7TUFDbkIsUUFBQSxHQUFXLENBQUMsWUFBRDtNQUNYLGlCQUFBLEdBQW9CLE9BQU8sQ0FBQyxHQUFSLENBQVksUUFBUSxDQUFDLEdBQVQsQ0FBYSxTQUFDLEdBQUQ7ZUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLEdBQTlCO01BRDJDLENBQWIsQ0FBWjtNQUVwQixVQUFVLENBQUMsUUFBWCxDQUFBO0FBQ0EsYUFBTztJQU5TLENBQWxCO0lBUUEsU0FBQSxFQUFXLFNBQUMsT0FBRCxFQUFVLEtBQVY7QUFDVCxVQUFBOztRQUFBLElBQUMsQ0FBQSxrQkFBbUI7OztZQUNILENBQUEsT0FBQSxJQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixPQUFoQjs7YUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLE9BQWhCLEVBQXlCLEtBQXpCO0lBSFMsQ0FSWDtJQWFBLFdBQUEsRUFBYSxTQUFDLE9BQUQ7QUFDWCxVQUFBOztRQUFBLElBQUMsQ0FBQSxrQkFBbUI7OztZQUNILENBQUEsT0FBQSxJQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixPQUFoQjs7YUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFaLENBQWtCLE9BQWxCO0lBSFcsQ0FiYjtJQWtCQSxjQUFBLEVBQWdCLFNBQUE7QUFDZCxVQUFBO01BQUEsSUFBRyxJQUFDLENBQUEsZUFBSjtBQUNFO0FBQUE7YUFBQSxjQUFBOzt1QkFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsT0FBaEIsRUFBeUIsS0FBekI7QUFERjt1QkFERjs7SUFEYyxDQWxCaEI7SUF1QkEsU0FBQSxFQUFXLFNBQUMsT0FBRCxFQUFVLEtBQVYsRUFBaUIsSUFBakI7QUFDVCxVQUFBO01BQUEsSUFBRyxPQUFPLE9BQVAsS0FBa0IsVUFBckI7UUFDRSxNQUFnQixDQUFDLE9BQUQsRUFBVSxLQUFWLENBQWhCLEVBQUMsY0FBRCxFQUFRO1FBQ1IsT0FBQSxHQUFVLEtBRlo7O01BR0EsSUFBQSxHQUFPO01BQ1AsUUFBQSxHQUFXO01BRVgsSUFBQSxDQUFLLFNBQUE7ZUFDSCxLQUFBLENBQU0sU0FBQTtBQUNKLGNBQUE7VUFESztVQUNMLElBQUEsR0FBTztpQkFDUCxRQUFBLEdBQVc7UUFGUCxDQUFOO01BREcsQ0FBTDtNQU1BLFFBQUEsQ0FBUyxTQUFBO2VBQ1A7TUFETyxDQUFULEVBRUUsSUFGRixFQUVRLE9BRlI7TUFJQSxJQUFHLFlBQUg7ZUFDRSxJQUFBLENBQUssU0FBQTtpQkFDSCxJQUFJLENBQUMsS0FBTCxDQUFXLElBQVgsRUFBaUIsUUFBakI7UUFERyxDQUFMLEVBREY7O0lBakJTLENBdkJYOztBQURGIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPVxuICBhY3RpdmF0ZVBhY2thZ2VzOiAtPlxuICAgIHdvcmtzcGFjZUVsZW1lbnQgPSBhdG9tLnZpZXdzLmdldFZpZXcgYXRvbS53b3Jrc3BhY2VcbiAgICBwYWNrYWdlcyA9IFsnYXRvbS1sYXRleCddXG4gICAgYWN0aXZhdGlvblByb21pc2UgPSBQcm9taXNlLmFsbCBwYWNrYWdlcy5tYXAgKHBrZykgLT5cbiAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlIHBrZ1xuICAgIGF0b21fbGF0ZXgubGF6eUxvYWQoKVxuICAgIHJldHVybiBhY3RpdmF0aW9uUHJvbWlzZVxuXG4gIHNldENvbmZpZzogKGtleVBhdGgsIHZhbHVlKSAtPlxuICAgIEBvcmlnaW5hbENvbmZpZ3MgPz0ge31cbiAgICBAb3JpZ2luYWxDb25maWdzW2tleVBhdGhdID89IGF0b20uY29uZmlnLmdldCBrZXlQYXRoXG4gICAgYXRvbS5jb25maWcuc2V0IGtleVBhdGgsIHZhbHVlXG5cbiAgdW5zZXRDb25maWc6IChrZXlQYXRoKSAtPlxuICAgIEBvcmlnaW5hbENvbmZpZ3MgPz0ge31cbiAgICBAb3JpZ2luYWxDb25maWdzW2tleVBhdGhdID89IGF0b20uY29uZmlnLmdldCBrZXlQYXRoXG4gICAgYXRvbS5jb25maWcudW5zZXQga2V5UGF0aFxuXG4gIHJlc3RvcmVDb25maWdzOiAtPlxuICAgIGlmIEBvcmlnaW5hbENvbmZpZ3NcbiAgICAgIGZvciBrZXlQYXRoLCB2YWx1ZSBvZiBAb3JpZ2luYWxDb25maWdzXG4gICAgICAgIGF0b20uY29uZmlnLnNldCBrZXlQYXRoLCB2YWx1ZVxuXG4gIGNhbGxBc3luYzogKHRpbWVvdXQsIGFzeW5jLCBuZXh0KSAtPlxuICAgIGlmIHR5cGVvZiB0aW1lb3V0IGlzICdmdW5jdGlvbidcbiAgICAgIFthc3luYywgbmV4dF0gPSBbdGltZW91dCwgYXN5bmNdXG4gICAgICB0aW1lb3V0ID0gNTAwMFxuICAgIGRvbmUgPSBmYWxzZVxuICAgIG5leHRBcmdzID0gbnVsbFxuXG4gICAgcnVucyAtPlxuICAgICAgYXN5bmMgKGFyZ3MuLi4pIC0+XG4gICAgICAgIGRvbmUgPSB0cnVlXG4gICAgICAgIG5leHRBcmdzID0gYXJnc1xuXG5cbiAgICB3YWl0c0ZvciAtPlxuICAgICAgZG9uZVxuICAgICwgbnVsbCwgdGltZW91dFxuXG4gICAgaWYgbmV4dD9cbiAgICAgIHJ1bnMgLT5cbiAgICAgICAgbmV4dC5hcHBseSh0aGlzLCBuZXh0QXJncylcbiJdfQ==
