const initialState = {
  blog: [],
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add_Data":
      const { id, data } = action.payload;
      return {
        ...state,
        blog: [
          ...state.blog,
          {
            id: id,
            data: data,
          },
        ],
      };
      break;
    case "Delete_Data":
      const newblog = state.blog.filter((item) => item.id !== action.id);
      return {
        ...state,
        blog: newblog,
      };
      break;

    case "Edit_Data":
      console.log("root", action.payload);

      return {
        ...state,
        blog: [action.payload],
      };

    default:
      return state;
  }
};

export default blogReducer;
