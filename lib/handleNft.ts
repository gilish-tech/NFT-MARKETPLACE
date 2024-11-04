
import {convertTokenUriJson} from "./handleIpfsImage"; 





function calculateNFTRange(page: number, pageSize = 24) {
    const start = (page - 1) * pageSize + 1;
    const end = page * pageSize;
    return { start, end };
  }
  
  export const getNfts = async (id: number) => {
    const { start, end } = calculateNFTRange(id);
    
    const urls = Array.from({ length: end - start + 1 }, (_, i) => 
      `${process.env.NFT_META_DATA_URL}/${start + i}`
    );
  
    const data = await Promise.all(urls.map(convertTokenUriJson));
    return data;
  };
  