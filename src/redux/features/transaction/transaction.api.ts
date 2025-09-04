import { baseApi } from "@/redux/baseApi";

type Payload = {
  amount: number;
  emailOrPhone: string;
  notes?: string;
};

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userDeposit: builder.mutation({
      query: (data: Payload) => ({
        url: `/transactions/user/deposit`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["TRANSACTIONS"],
    }),
    userWithdraw: builder.mutation({
      query: (data: Payload) => ({
        url: `/transactions/user/withdraw`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["TRANSACTIONS"],
    }),
    userSendMoney: builder.mutation({
      query: (data: Payload) => ({
        url: `/transactions/user/send-money`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["TRANSACTIONS"],
    }),
    agentAddMoney: builder.mutation({
      query: (data: Payload) => ({
        url: `/transactions/agent/add-money`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["TRANSACTIONS"],
    }),
    agentWithdraw: builder.mutation({
      query: (data: Payload) => ({
        url: `/transactions/agent/withdraw`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["TRANSACTIONS"],
    }),
  }),
});

export const {
  useUserDepositMutation,
  useUserWithdrawMutation,
  useUserSendMoneyMutation,
  useAgentAddMoneyMutation,
  useAgentWithdrawMutation,
} = transactionApi;
