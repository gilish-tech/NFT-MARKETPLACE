
export const checkPathEquality = (path:string, currentPath: string) => {
    if (currentPath.includes("nft") && (path == "/nfts") ){
        return true

    }

    return path === currentPath
 
}

