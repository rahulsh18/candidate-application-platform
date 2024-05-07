import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ limit, offset })
      });
      if (!response.ok) throw new Error('Network response unsuccessful');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    totalCount: 0,
  },
  reducers: {},   // more reducers can be added in future if required
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload.jdList;
        state.totalCount = action.payload.totalCount;
        state.loading = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { } = jobsSlice.actions; // kept in case any custom reducers are added in future
export default jobsSlice.reducer;
