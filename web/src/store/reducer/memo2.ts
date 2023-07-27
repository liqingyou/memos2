import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uniqBy } from "lodash-es";

interface State2 {
  memos: Memo[];
  isFetching: boolean;
}

const memoSlice = createSlice({
  name: "memo",
  initialState: {
    memos: [],
    memos_comment: [],
    // isFetching flag should starts with true.
    isFetching: true,
  } as State2,
  reducers: {
    upsertMemos2: (state, action: PayloadAction<Memo[]>) => {
      return {
        ...state,
        memos: uniqBy([...state.memos, ...action.payload], "id"),
      };
    },
    createMemo2: (state, action: PayloadAction<Memo>) => {
      return {
        ...state,
        memos: state.memos.concat(action.payload),
      };
    },
    patchMemo2: (state, action: PayloadAction<Partial<Memo>>) => {
      return {
        ...state,
        memos: state.memos
          .map((memo) => {
            if (memo.id === action.payload.id) {
              return {
                ...memo,
                ...action.payload,
              };
            } else {
              return memo;
            }
          })
          .filter((memo) => memo.rowStatus === "NORMAL"),
      };
    },
    deleteMemo2: (state, action: PayloadAction<MemoId>) => {
      return {
        ...state,
        memos: state.memos.filter((memo) => {
          return memo.id !== action.payload;
        }),
      };
    },
    setIsFetching2: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isFetching: action.payload,
      };
    },
  },
});

export const { upsertMemos2, createMemo2, patchMemo2, deleteMemo2, setIsFetching2 } = memoSlice.actions;

export default memoSlice.reducer;
