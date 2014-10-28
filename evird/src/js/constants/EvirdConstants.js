var keyMirror = require('react/lib/keyMirror');


exports.EvirdConstants = {

  ActionTypes: keyMirror({
    CHANGED_SORT_BY: null,
    DOUBLE_CLICKED_FOLDER: null,
    RETRIEVED_ALL_FILES: null,

    GAPI_AUTHORIZED: null,
    DRIVE_API_LOADED: null,
    DRIVE_API_LOAD_FAILED: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
