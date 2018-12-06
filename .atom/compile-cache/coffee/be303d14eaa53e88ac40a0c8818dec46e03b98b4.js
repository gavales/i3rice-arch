(function() {
  module.exports = {
    toolchain: {
      title: 'Toolchain to use',
      order: 1,
      description: 'The toolchain to build LaTeX. `auto` tries `latexmk toolchain` and fallbacks to the default `custom toolchain`.',
      type: 'string',
      "default": 'auto',
      "enum": ['auto', 'latexmk toolchain', 'custom toolchain']
    },
    latexmk_param: {
      title: 'latexmk execution parameters',
      order: 2,
      description: 'The parameters to use when invoking `latexmk`.',
      type: 'string',
      "default": '-synctex=1 -interaction=nonstopmode -file-line-error -pdf'
    },
    custom_toolchain: {
      title: 'Custom toolchain commands',
      order: 3,
      description: 'The commands to execute in `custom` toolchain. Multiple commands should be separated by `&&`. Placeholders `%TEX` `%ARG` `%BIB` will be replaced by the following settings, and `%DOC` will be replaced by the main LaTeX file which is either automatically detected or manually set',
      type: 'string',
      "default": '%TEX %ARG %DOC && %BIB %DOC && %TEX %ARG %DOC && %TEX %ARG %DOC'
    },
    compiler: {
      title: 'LaTeX compiler to use',
      order: 4,
      description: 'The LaTeX compiler to use in `custom` toolchain. Replaces all `%TEX` string in `custom` toolchain command.',
      type: 'string',
      "default": 'pdflatex'
    },
    compiler_param: {
      title: 'LaTeX compiler execution parameters',
      order: 5,
      description: 'The parameters to use when invoking the custom compiler. Replaces all `%ARG` string in `custom` toolchain command.',
      type: 'string',
      "default": '-synctex=1 -interaction=nonstopmode -file-line-error'
    },
    bibtex: {
      title: 'bibTeX compiler to use',
      order: 6,
      description: 'The bibTeX compiler to use in `custom` toolchain. Replaces all `%BIB` string in `custom` toolchain command.',
      type: 'string',
      "default": 'bibtex'
    },
    build_after_save: {
      title: 'Build LaTeX after saving',
      order: 7,
      description: 'Start building with toolchain after saving a `.tex` file.',
      type: 'boolean',
      "default": true
    },
    save_on_build: {
      title: 'Save files before Build',
      order: 8,
      description: 'Save all files in current document prior building LateX',
      type: 'boolean',
      "default": false
    },
    focus_viewer: {
      title: 'Focus PDF viewer window after building',
      order: 9,
      description: 'PDF viewer window will gain focus after building LaTeX or forward SyncTeX.',
      type: 'boolean',
      "default": false
    },
    preview_after_build: {
      title: 'Preview PDF after building process',
      order: 10,
      description: 'Use PDF viewer to preview the generated PDF file after successfully building LaTeX.',
      type: 'string',
      "default": 'View in PDF viewer window',
      "enum": ['View in PDF viewer window', 'View in PDF viewer tab', 'Do nothing']
    },
    combine_typesetting_log: {
      title: 'Combine typesetting log messages',
      order: 11,
      description: 'Combine typesetting log messages in log panel. Sometimes typesetting messages may clutter the panel. Enable this config to display one message for all typesetting entries.',
      type: 'boolean',
      "default": true
    },
    hide_log_if_success: {
      title: 'Hide LaTeX log messages on successful build',
      order: 12,
      description: 'Hide the LaTeX log panel if the build process is successful. This will save some space for the editor, but warnings are hidden unless manually clicking the `Show build log` icon.',
      type: 'boolean',
      "default": false
    },
    file_ext_to_clean: {
      title: 'Files to clean',
      order: 13,
      description: 'All files under the LaTeX project root directory with the setextensions will be removed when cleaning LaTeX project. Multiple file extensions are joint with commas.',
      type: 'string',
      "default": '*.aux, *.bbl, *.blg, *.idx, *.ind, *.lof, *.lot, *.out, *.toc, *.acn, *.acr, *.alg, *.glg, *.glo, *.gls, *.ist, *.fls, *.log, *.fdb_latexmk'
    },
    clean_after_build: {
      title: 'Clean LaTeX auxiliary files after building process',
      order: 14,
      description: 'Clean all auxiliary files after building LaTeX project by the defined file extensions.',
      type: 'boolean',
      "default": false
    },
    delayed_minimap_refresh: {
      title: 'Delay the refresh actions of atom-minimap',
      order: 15,
      description: 'Delay the refresh actions of atom-minimap upon typing. This setting can reduce the keystroke stuttering in very long LaTeX source files caused by minimap extension. Reload Atom to take effect.',
      type: 'boolean',
      "default": false
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvZ2F2YXJjaC8uYXRvbS9wYWNrYWdlcy9hdG9tLWxhdGV4L2xpYi9jb25maWcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtJQUFBLFNBQUEsRUFDRTtNQUFBLEtBQUEsRUFBTyxrQkFBUDtNQUNBLEtBQUEsRUFBTyxDQURQO01BRUEsV0FBQSxFQUFhLGlIQUZiO01BSUEsSUFBQSxFQUFNLFFBSk47TUFLQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLE1BTFQ7TUFNQSxDQUFBLElBQUEsQ0FBQSxFQUFNLENBQ0osTUFESSxFQUVKLG1CQUZJLEVBR0osa0JBSEksQ0FOTjtLQURGO0lBWUEsYUFBQSxFQUNFO01BQUEsS0FBQSxFQUFPLDhCQUFQO01BQ0EsS0FBQSxFQUFPLENBRFA7TUFFQSxXQUFBLEVBQWEsZ0RBRmI7TUFHQSxJQUFBLEVBQU0sUUFITjtNQUlBLENBQUEsT0FBQSxDQUFBLEVBQVMsMkRBSlQ7S0FiRjtJQWtCQSxnQkFBQSxFQUNFO01BQUEsS0FBQSxFQUFPLDJCQUFQO01BQ0EsS0FBQSxFQUFPLENBRFA7TUFFQSxXQUFBLEVBQWEsdVJBRmI7TUFPQSxJQUFBLEVBQU0sUUFQTjtNQVFBLENBQUEsT0FBQSxDQUFBLEVBQVMsaUVBUlQ7S0FuQkY7SUE0QkEsUUFBQSxFQUNFO01BQUEsS0FBQSxFQUFPLHVCQUFQO01BQ0EsS0FBQSxFQUFPLENBRFA7TUFFQSxXQUFBLEVBQWEsNEdBRmI7TUFJQSxJQUFBLEVBQU0sUUFKTjtNQUtBLENBQUEsT0FBQSxDQUFBLEVBQVMsVUFMVDtLQTdCRjtJQW1DQSxjQUFBLEVBQ0U7TUFBQSxLQUFBLEVBQU8scUNBQVA7TUFDQSxLQUFBLEVBQU8sQ0FEUDtNQUVBLFdBQUEsRUFBYSxvSEFGYjtNQUlBLElBQUEsRUFBTSxRQUpOO01BS0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxzREFMVDtLQXBDRjtJQTBDQSxNQUFBLEVBQ0U7TUFBQSxLQUFBLEVBQU8sd0JBQVA7TUFDQSxLQUFBLEVBQU8sQ0FEUDtNQUVBLFdBQUEsRUFBYSw2R0FGYjtNQUlBLElBQUEsRUFBTSxRQUpOO01BS0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxRQUxUO0tBM0NGO0lBaURBLGdCQUFBLEVBQ0U7TUFBQSxLQUFBLEVBQU8sMEJBQVA7TUFDQSxLQUFBLEVBQU8sQ0FEUDtNQUVBLFdBQUEsRUFBYSwyREFGYjtNQUdBLElBQUEsRUFBTSxTQUhOO01BSUEsQ0FBQSxPQUFBLENBQUEsRUFBUyxJQUpUO0tBbERGO0lBdURBLGFBQUEsRUFDRTtNQUFBLEtBQUEsRUFBTyx5QkFBUDtNQUNBLEtBQUEsRUFBTyxDQURQO01BRUEsV0FBQSxFQUFhLHlEQUZiO01BR0EsSUFBQSxFQUFNLFNBSE47TUFJQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEtBSlQ7S0F4REY7SUE2REEsWUFBQSxFQUNFO01BQUEsS0FBQSxFQUFPLHdDQUFQO01BQ0EsS0FBQSxFQUFPLENBRFA7TUFFQSxXQUFBLEVBQWEsNEVBRmI7TUFJQSxJQUFBLEVBQU0sU0FKTjtNQUtBLENBQUEsT0FBQSxDQUFBLEVBQVMsS0FMVDtLQTlERjtJQW9FQSxtQkFBQSxFQUNFO01BQUEsS0FBQSxFQUFPLG9DQUFQO01BQ0EsS0FBQSxFQUFPLEVBRFA7TUFFQSxXQUFBLEVBQWEscUZBRmI7TUFJQSxJQUFBLEVBQU0sUUFKTjtNQUtBLENBQUEsT0FBQSxDQUFBLEVBQVMsMkJBTFQ7TUFNQSxDQUFBLElBQUEsQ0FBQSxFQUFNLENBQ0osMkJBREksRUFFSix3QkFGSSxFQUdKLFlBSEksQ0FOTjtLQXJFRjtJQWdGQSx1QkFBQSxFQUNFO01BQUEsS0FBQSxFQUFPLGtDQUFQO01BQ0EsS0FBQSxFQUFPLEVBRFA7TUFFQSxXQUFBLEVBQWEsNktBRmI7TUFLQSxJQUFBLEVBQU0sU0FMTjtNQU1BLENBQUEsT0FBQSxDQUFBLEVBQVMsSUFOVDtLQWpGRjtJQXdGQSxtQkFBQSxFQUNFO01BQUEsS0FBQSxFQUFPLDZDQUFQO01BQ0EsS0FBQSxFQUFPLEVBRFA7TUFFQSxXQUFBLEVBQWEsb0xBRmI7TUFLQSxJQUFBLEVBQU0sU0FMTjtNQU1BLENBQUEsT0FBQSxDQUFBLEVBQVMsS0FOVDtLQXpGRjtJQWdHQSxpQkFBQSxFQUNFO01BQUEsS0FBQSxFQUFPLGdCQUFQO01BQ0EsS0FBQSxFQUFPLEVBRFA7TUFFQSxXQUFBLEVBQWEsc0tBRmI7TUFLQSxJQUFBLEVBQU0sUUFMTjtNQU1BLENBQUEsT0FBQSxDQUFBLEVBQVMsNklBTlQ7S0FqR0Y7SUEwR0EsaUJBQUEsRUFDRTtNQUFBLEtBQUEsRUFBTyxvREFBUDtNQUNBLEtBQUEsRUFBTyxFQURQO01BRUEsV0FBQSxFQUFhLHdGQUZiO01BSUEsSUFBQSxFQUFNLFNBSk47TUFLQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEtBTFQ7S0EzR0Y7SUFpSEEsdUJBQUEsRUFDRTtNQUFBLEtBQUEsRUFBTywyQ0FBUDtNQUNBLEtBQUEsRUFBTyxFQURQO01BRUEsV0FBQSxFQUFhLGtNQUZiO01BTUEsSUFBQSxFQUFNLFNBTk47TUFPQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEtBUFQ7S0FsSEY7O0FBREYiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9XG4gIHRvb2xjaGFpbjpcbiAgICB0aXRsZTogJ1Rvb2xjaGFpbiB0byB1c2UnXG4gICAgb3JkZXI6IDFcbiAgICBkZXNjcmlwdGlvbjogJ1RoZSB0b29sY2hhaW4gdG8gYnVpbGQgTGFUZVguIGBhdXRvYCB0cmllcyBgbGF0ZXhtayBcXFxuICAgICAgICAgICAgICAgICAgdG9vbGNoYWluYCBhbmQgZmFsbGJhY2tzIHRvIHRoZSBkZWZhdWx0IGBjdXN0b20gdG9vbGNoYWluYC4nXG4gICAgdHlwZTogJ3N0cmluZydcbiAgICBkZWZhdWx0OiAnYXV0bydcbiAgICBlbnVtOiBbXG4gICAgICAnYXV0bydcbiAgICAgICdsYXRleG1rIHRvb2xjaGFpbidcbiAgICAgICdjdXN0b20gdG9vbGNoYWluJ1xuICAgIF1cbiAgbGF0ZXhta19wYXJhbTpcbiAgICB0aXRsZTogJ2xhdGV4bWsgZXhlY3V0aW9uIHBhcmFtZXRlcnMnXG4gICAgb3JkZXI6IDJcbiAgICBkZXNjcmlwdGlvbjogJ1RoZSBwYXJhbWV0ZXJzIHRvIHVzZSB3aGVuIGludm9raW5nIGBsYXRleG1rYC4nXG4gICAgdHlwZTogJ3N0cmluZydcbiAgICBkZWZhdWx0OiAnLXN5bmN0ZXg9MSAtaW50ZXJhY3Rpb249bm9uc3RvcG1vZGUgLWZpbGUtbGluZS1lcnJvciAtcGRmJ1xuICBjdXN0b21fdG9vbGNoYWluOlxuICAgIHRpdGxlOiAnQ3VzdG9tIHRvb2xjaGFpbiBjb21tYW5kcydcbiAgICBvcmRlcjogM1xuICAgIGRlc2NyaXB0aW9uOiAnVGhlIGNvbW1hbmRzIHRvIGV4ZWN1dGUgaW4gYGN1c3RvbWAgdG9vbGNoYWluLiBNdWx0aXBsZSBcXFxuICAgICAgICAgICAgICAgICAgY29tbWFuZHMgc2hvdWxkIGJlIHNlcGFyYXRlZCBieSBgJiZgLiBQbGFjZWhvbGRlcnMgYCVURVhgIFxcXG4gICAgICAgICAgICAgICAgICBgJUFSR2AgYCVCSUJgIHdpbGwgYmUgcmVwbGFjZWQgYnkgdGhlIGZvbGxvd2luZyBzZXR0aW5ncywgXFxcbiAgICAgICAgICAgICAgICAgIGFuZCBgJURPQ2Agd2lsbCBiZSByZXBsYWNlZCBieSB0aGUgbWFpbiBMYVRlWCBmaWxlIHdoaWNoIFxcXG4gICAgICAgICAgICAgICAgICBpcyBlaXRoZXIgYXV0b21hdGljYWxseSBkZXRlY3RlZCBvciBtYW51YWxseSBzZXQnXG4gICAgdHlwZTogJ3N0cmluZydcbiAgICBkZWZhdWx0OiAnJVRFWCAlQVJHICVET0MgJiYgJUJJQiAlRE9DICYmICVURVggJUFSRyAlRE9DICYmICVURVggJUFSRyAlRE9DJ1xuICBjb21waWxlcjpcbiAgICB0aXRsZTogJ0xhVGVYIGNvbXBpbGVyIHRvIHVzZSdcbiAgICBvcmRlcjogNFxuICAgIGRlc2NyaXB0aW9uOiAnVGhlIExhVGVYIGNvbXBpbGVyIHRvIHVzZSBpbiBgY3VzdG9tYCB0b29sY2hhaW4uIFJlcGxhY2VzIFxcXG4gICAgICAgICAgICAgICAgICBhbGwgYCVURVhgIHN0cmluZyBpbiBgY3VzdG9tYCB0b29sY2hhaW4gY29tbWFuZC4nXG4gICAgdHlwZTogJ3N0cmluZydcbiAgICBkZWZhdWx0OiAncGRmbGF0ZXgnXG4gIGNvbXBpbGVyX3BhcmFtOlxuICAgIHRpdGxlOiAnTGFUZVggY29tcGlsZXIgZXhlY3V0aW9uIHBhcmFtZXRlcnMnXG4gICAgb3JkZXI6IDVcbiAgICBkZXNjcmlwdGlvbjogJ1RoZSBwYXJhbWV0ZXJzIHRvIHVzZSB3aGVuIGludm9raW5nIHRoZSBjdXN0b20gY29tcGlsZXIuIFxcXG4gICAgICAgICAgICAgICAgICBSZXBsYWNlcyBhbGwgYCVBUkdgIHN0cmluZyBpbiBgY3VzdG9tYCB0b29sY2hhaW4gY29tbWFuZC4nXG4gICAgdHlwZTogJ3N0cmluZydcbiAgICBkZWZhdWx0OiAnLXN5bmN0ZXg9MSAtaW50ZXJhY3Rpb249bm9uc3RvcG1vZGUgLWZpbGUtbGluZS1lcnJvcidcbiAgYmlidGV4OlxuICAgIHRpdGxlOiAnYmliVGVYIGNvbXBpbGVyIHRvIHVzZSdcbiAgICBvcmRlcjogNlxuICAgIGRlc2NyaXB0aW9uOiAnVGhlIGJpYlRlWCBjb21waWxlciB0byB1c2UgaW4gYGN1c3RvbWAgdG9vbGNoYWluLiBSZXBsYWNlcyBcXFxuICAgICAgICAgICAgICAgICAgYWxsIGAlQklCYCBzdHJpbmcgaW4gYGN1c3RvbWAgdG9vbGNoYWluIGNvbW1hbmQuJ1xuICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgZGVmYXVsdDogJ2JpYnRleCdcbiAgYnVpbGRfYWZ0ZXJfc2F2ZTpcbiAgICB0aXRsZTogJ0J1aWxkIExhVGVYIGFmdGVyIHNhdmluZydcbiAgICBvcmRlcjogN1xuICAgIGRlc2NyaXB0aW9uOiAnU3RhcnQgYnVpbGRpbmcgd2l0aCB0b29sY2hhaW4gYWZ0ZXIgc2F2aW5nIGEgYC50ZXhgIGZpbGUuJ1xuICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIGRlZmF1bHQ6IHRydWVcbiAgc2F2ZV9vbl9idWlsZDpcbiAgICB0aXRsZTogJ1NhdmUgZmlsZXMgYmVmb3JlIEJ1aWxkJ1xuICAgIG9yZGVyOiA4XG4gICAgZGVzY3JpcHRpb246ICdTYXZlIGFsbCBmaWxlcyBpbiBjdXJyZW50IGRvY3VtZW50IHByaW9yIGJ1aWxkaW5nIExhdGVYJ1xuICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIGZvY3VzX3ZpZXdlcjpcbiAgICB0aXRsZTogJ0ZvY3VzIFBERiB2aWV3ZXIgd2luZG93IGFmdGVyIGJ1aWxkaW5nJ1xuICAgIG9yZGVyOiA5XG4gICAgZGVzY3JpcHRpb246ICdQREYgdmlld2VyIHdpbmRvdyB3aWxsIGdhaW4gZm9jdXMgYWZ0ZXIgYnVpbGRpbmcgTGFUZVggb3IgXFxcbiAgICAgICAgICAgICAgICAgIGZvcndhcmQgU3luY1RlWC4nXG4gICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgZGVmYXVsdDogZmFsc2VcbiAgcHJldmlld19hZnRlcl9idWlsZDpcbiAgICB0aXRsZTogJ1ByZXZpZXcgUERGIGFmdGVyIGJ1aWxkaW5nIHByb2Nlc3MnXG4gICAgb3JkZXI6IDEwXG4gICAgZGVzY3JpcHRpb246ICdVc2UgUERGIHZpZXdlciB0byBwcmV2aWV3IHRoZSBnZW5lcmF0ZWQgUERGIGZpbGUgYWZ0ZXIgXFxcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWxseSBidWlsZGluZyBMYVRlWC4nXG4gICAgdHlwZTogJ3N0cmluZydcbiAgICBkZWZhdWx0OiAnVmlldyBpbiBQREYgdmlld2VyIHdpbmRvdydcbiAgICBlbnVtOiBbXG4gICAgICAnVmlldyBpbiBQREYgdmlld2VyIHdpbmRvdydcbiAgICAgICdWaWV3IGluIFBERiB2aWV3ZXIgdGFiJ1xuICAgICAgJ0RvIG5vdGhpbmcnXG4gICAgXVxuICBjb21iaW5lX3R5cGVzZXR0aW5nX2xvZzpcbiAgICB0aXRsZTogJ0NvbWJpbmUgdHlwZXNldHRpbmcgbG9nIG1lc3NhZ2VzJ1xuICAgIG9yZGVyOiAxMVxuICAgIGRlc2NyaXB0aW9uOiAnQ29tYmluZSB0eXBlc2V0dGluZyBsb2cgbWVzc2FnZXMgaW4gbG9nIHBhbmVsLiBTb21ldGltZXMgXFxcbiAgICAgICAgICAgICAgICAgIHR5cGVzZXR0aW5nIG1lc3NhZ2VzIG1heSBjbHV0dGVyIHRoZSBwYW5lbC4gRW5hYmxlIHRoaXMgXFxcbiAgICAgICAgICAgICAgICAgIGNvbmZpZyB0byBkaXNwbGF5IG9uZSBtZXNzYWdlIGZvciBhbGwgdHlwZXNldHRpbmcgZW50cmllcy4nXG4gICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgZGVmYXVsdDogdHJ1ZVxuICBoaWRlX2xvZ19pZl9zdWNjZXNzOlxuICAgIHRpdGxlOiAnSGlkZSBMYVRlWCBsb2cgbWVzc2FnZXMgb24gc3VjY2Vzc2Z1bCBidWlsZCdcbiAgICBvcmRlcjogMTJcbiAgICBkZXNjcmlwdGlvbjogJ0hpZGUgdGhlIExhVGVYIGxvZyBwYW5lbCBpZiB0aGUgYnVpbGQgcHJvY2VzcyBpcyBzdWNjZXNzZnVsLiBcXFxuICAgICAgICAgICAgICAgICAgVGhpcyB3aWxsIHNhdmUgc29tZSBzcGFjZSBmb3IgdGhlIGVkaXRvciwgYnV0IHdhcm5pbmdzIGFyZSBcXFxuICAgICAgICAgICAgICAgICAgaGlkZGVuIHVubGVzcyBtYW51YWxseSBjbGlja2luZyB0aGUgYFNob3cgYnVpbGQgbG9nYCBpY29uLidcbiAgICB0eXBlOiAnYm9vbGVhbidcbiAgICBkZWZhdWx0OiBmYWxzZVxuICBmaWxlX2V4dF90b19jbGVhbjpcbiAgICB0aXRsZTogJ0ZpbGVzIHRvIGNsZWFuJ1xuICAgIG9yZGVyOiAxM1xuICAgIGRlc2NyaXB0aW9uOiAnQWxsIGZpbGVzIHVuZGVyIHRoZSBMYVRlWCBwcm9qZWN0IHJvb3QgZGlyZWN0b3J5IHdpdGggdGhlIHNldFxcXG4gICAgICAgICAgICAgICAgICBleHRlbnNpb25zIHdpbGwgYmUgcmVtb3ZlZCB3aGVuIGNsZWFuaW5nIExhVGVYIHByb2plY3QuIFxcXG4gICAgICAgICAgICAgICAgICBNdWx0aXBsZSBmaWxlIGV4dGVuc2lvbnMgYXJlIGpvaW50IHdpdGggY29tbWFzLidcbiAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIGRlZmF1bHQ6ICcqLmF1eCwgKi5iYmwsICouYmxnLCAqLmlkeCwgKi5pbmQsICoubG9mLCAqLmxvdCwgKi5vdXQsICoudG9jLCBcXFxuICAgICAgICAgICAgICAqLmFjbiwgKi5hY3IsICouYWxnLCAqLmdsZywgKi5nbG8sICouZ2xzLCAqLmlzdCwgKi5mbHMsICoubG9nLCBcXFxuICAgICAgICAgICAgICAqLmZkYl9sYXRleG1rJ1xuICBjbGVhbl9hZnRlcl9idWlsZDpcbiAgICB0aXRsZTogJ0NsZWFuIExhVGVYIGF1eGlsaWFyeSBmaWxlcyBhZnRlciBidWlsZGluZyBwcm9jZXNzJ1xuICAgIG9yZGVyOiAxNFxuICAgIGRlc2NyaXB0aW9uOiAnQ2xlYW4gYWxsIGF1eGlsaWFyeSBmaWxlcyBhZnRlciBidWlsZGluZyBMYVRlWCBwcm9qZWN0IGJ5IFxcXG4gICAgICAgICAgICAgICAgICB0aGUgZGVmaW5lZCBmaWxlIGV4dGVuc2lvbnMuJ1xuICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIGRlbGF5ZWRfbWluaW1hcF9yZWZyZXNoOlxuICAgIHRpdGxlOiAnRGVsYXkgdGhlIHJlZnJlc2ggYWN0aW9ucyBvZiBhdG9tLW1pbmltYXAnXG4gICAgb3JkZXI6IDE1XG4gICAgZGVzY3JpcHRpb246ICdEZWxheSB0aGUgcmVmcmVzaCBhY3Rpb25zIG9mIGF0b20tbWluaW1hcCB1cG9uIHR5cGluZy4gVGhpcyBcXFxuICAgICAgICAgICAgICAgICAgc2V0dGluZyBjYW4gcmVkdWNlIHRoZSBrZXlzdHJva2Ugc3R1dHRlcmluZyBpbiB2ZXJ5IGxvbmcgXFxcbiAgICAgICAgICAgICAgICAgIExhVGVYIHNvdXJjZSBmaWxlcyBjYXVzZWQgYnkgbWluaW1hcCBleHRlbnNpb24uIFJlbG9hZCBBdG9tIFxcXG4gICAgICAgICAgICAgICAgICB0byB0YWtlIGVmZmVjdC4nXG4gICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgZGVmYXVsdDogZmFsc2VcbiJdfQ==
