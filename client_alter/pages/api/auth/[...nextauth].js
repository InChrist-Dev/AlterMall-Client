import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from 'next-auth/providers/naver'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: '1034112248015-vkavbpp4tuuchguilgb9mpgitghsimd6.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
  secret : 'Dkssud12!'
};
export default NextAuth(authOptions); 

