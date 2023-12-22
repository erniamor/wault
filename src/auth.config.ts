import type { NextAuthConfig } from 'next-auth';

const RESTRICTED_PAGES = ['folder', 'note', 'search', 'profile'];

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const currentPage = nextUrl.pathname.split('/')[1];
      const isOnRestrictedPage = RESTRICTED_PAGES.includes(currentPage);

      if (!isLoggedIn && isOnRestrictedPage) {
        // return Response.redirect(new URL('/auth/login', nextUrl));
        return false;
      } else if (isLoggedIn && !isOnRestrictedPage) {
        return Response.redirect(new URL('/folder', nextUrl));
      }

      return true;
    },
    async session({ session, token }) {
      session = {
        ...session,
        user: {
          ...session.user,
          id: token?.sub as string,
        },
      };
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;