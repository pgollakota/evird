var keyMirror = require('react/lib/keyMirror');


exports.EvirdConstants = {

  ActionTypes: keyMirror({
    CHANGED_SORT_BY: null,
    DOUBLE_CLICKED_FOLDER: null,
    RETRIEVED_ALL_FILES: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
