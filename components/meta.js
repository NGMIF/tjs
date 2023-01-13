import Head from "next/head";

function Meta({ title, keywords, description }) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
}

Meta.defaultProps = {
  title: "Athlete Studio NFL Allday Community",
  keywords: "NFT Athlete NFL Allday Community",
  description: "Community Dashboard for Athlete Studio NFLAllday",
};

export default Meta;
