import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { createClient } from '@supabase/supabase-js';
// import { syncUserToSupabase } from '@/lib/syncUserToSupabase';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  }),
  // events: {
  //   async signIn({ user }) {
  //     await syncUserToSupabase(user);
  //   },
  //   async createUser({ user }) {
  //     await syncUserToSupabase(user);
  //   },
  //   // 由于我们的表结构，updateUser 事件可能不需要处理
  // },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    },
  }
  // callbacks: {
  //   async signIn({ user, account, profile }) {
  //     if (account && account.provider === "github" && profile) {
  //       const username = (profile as any).login;
        
  //       if (!username) {
  //         console.error('GitHub profile does not contain a username');
  //         return false;
  //       }

  //       // 检查用户是否已存在于 Supabase 的 public schema
  //       const { data, error } = await supabase
  //         .from('users')
  //         .select()
  //         .eq('id', user.id)
  //         .single();

  //       if (error && error.code !== 'PGRST116') {
  //         console.error('Error checking user in Supabase:', error);
  //         return false;
  //       }

  //       if (!data) {
  //         // 如果用户不存在，则创建新用户
  //         const { error: insertError } = await supabase
  //           .from('users')
  //           .insert({
  //             id: user.id,
  //             email: user.email,
  //             name: user.name,
  //             username: username,
  //             // 添加其他需要的字段
  //           });

  //         if (insertError) {
  //           console.error('Error creating user in Supabase:', insertError);
  //           return false;
  //         }
  //       }
  //     }
  //     return true;
  //   },
  // },
});


// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import { SupabaseAdapter } from "@auth/supabase-adapter";
// import { createClient } from '@supabase/supabase-js';
// // import { syncUserToSupabase } from '@/lib/syncUserToSupabase';

// const supabase = createClient(
//   // process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   // process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   debug: true,
//   providers: [GitHub],
//   adapter: SupabaseAdapter({
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
//   }),
//   events: {
//     // async signIn({ user }) {
//     //   await syncUserToSupabase(user);
//     // },
//     // async createUser({ user }) {
//     //   await syncUserToSupabase(user);
//     // },
//     // 由于我们的表结构，updateUser 事件可能不需要处理
//   },
//   callbacks: {
//     session({ session, user }) {
//       session.user.id = user.id
//       return session
//     },
//   }

// });


// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import { SupabaseAdapter } from "@auth/supabase-adapter";
// import { createClient } from '@supabase/supabase-js';
// // import { syncUserToSupabase } from '@/lib/syncUserToSupabase';

// // const supabase = createClient(
// //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
// //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// // )

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [GitHub],
//   adapter: SupabaseAdapter({
//     url: process.env.SUPABASE_URL!,
//     // secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
//     // url: process.env.SUPABASE_URL,
//     secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
//   }),
//   events: {
//     // async signIn({ user }) {
//     //   await syncUserToSupabase(user);
//     // },
//     // async createUser({ user }) {
//     //   await syncUserToSupabase(user);
//     // },
//     // 由于我们的表结构，updateUser 事件可能不需要处理
//   },
//   callbacks: {
//     session({ session, user }) {
//       session.user.id = user.id
//       return session
//     },
//   }

// });