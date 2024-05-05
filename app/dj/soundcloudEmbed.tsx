export const SoundcloudEmbed = ({
  url,
  apiUrl,
  title,
}: {
  url: string;
  apiUrl: string;
  title: string;
}) => (
  <>
    <iframe
      width="100%"
      height="100"
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={apiUrl}
    ></iframe>
    <div
      style={{
        fontSize: "10px",
        color: "#cccccc",
        lineBreak: "anywhere",
        wordBreak: "normal",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        fontFamily:
          "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
        fontWeight: 100,
      }}
    >
      <a
        href="https://soundcloud.com/luddilo"
        title="luddilo"
        target="_blank"
        style={{ color: "#cccccc", textDecoration: "none" }}
      >
        luddilo
      </a>{" "}
      ·{" "}
      <a
        href={url}
        title={title}
        target="_blank"
        style={{ color: "#cccccc", textDecoration: "none" }}
      >
        {title}
      </a>
    </div>
  </>
);
