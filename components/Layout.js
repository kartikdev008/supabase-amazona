import Head from "next/head";

const Layout = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} - Supabase Amazona` : "Supabase Amazona"}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
