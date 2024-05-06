import { useEffect, useState } from "react";
import { isEmpty } from "ramda";
import { Paper, Stack, Typography } from "@mui/material";
import { useBaseUrl } from "@atoms/product.atom.ts";

const BaseImage = () => {
  const { baseUrl, getImageBlob } = useBaseUrl();
  const [size, setSize] = useState(0);

  useEffect(() => {
    (async () => {
      if (!isEmpty(baseUrl)) {
        const blob = await getImageBlob();
        setSize(Number((blob.size / 1000).toFixed(1)));
      }
    })();
  }, [baseUrl, getImageBlob]);

  return (
    <Paper sx={{ display: "flex", flexDirection: "row", p: 2, gap: 2 }}>
      <Stack sx={{ width: 200, height: 128 }}>
        <img
          src={baseUrl}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          crossOrigin="anonymous"
        />
      </Stack>
      <Stack sx={{ flex: 1, gap: 2 }}>
        <Typography variant={"body2"}>{baseUrl}</Typography>
        <Typography variant={"body2"}>{size}KB</Typography>
      </Stack>
    </Paper>
  );
};

export default BaseImage;
