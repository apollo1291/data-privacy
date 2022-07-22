

const SearchSites = (string, sites) => {
    /**
     * Searches for any matches of substring 'string' in the list of sites 
     * @param: string -> the substring to be matched too
     * @param: sites -> a list of urls to search
     * @return: matches -> any urls that contian string
     */
    // variable to hold any mathes
    let matches = [] 
    
            
            
    // check each websites url and compare to input
    sites.forEach(element=> {
        
        if (string === ''){
            return
        }

        if (element['url'].includes(string)){
            matches.push(element)
        }
})

return matches
}

module.exports = {
    SearchSites
}