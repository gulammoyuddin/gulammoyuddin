const lodash = require('lodash')
const dummy = (blogs) => {
    return 1
  }
  const totalLikes=(blogs)=>{
    const reducer=(sum,item)=>{
      return sum+item.likes
    }
    return blogs.reduce(reducer,0)
  }
  const favoriteblog=(blogs)=>{
    const reducer=(max,item)=>{
      if(max<item.likes){
        max=item.likes
      }
      return max
    }
    const m=blogs.reduce(reducer,0)
    const k=blogs.filter(b=>b.likes===m)
    return {
      title:k[0].title,
      author:k[0].author,
      likes:k[0].likes
    }
  }
  const mostBlogs=(blogs)=>{
    let author=blogs.map(to=>{
      return to.author
    })
    author=lodash.uniq(author)
    const ca =author.map(t=>{
      const y=blogs.filter(to=>to.author===t)
      return y.length
    })
    const max=lodash.max(ca)
    const i=ca.indexOf(max)
    const maxauthor=author[i]
    return {
      author:maxauthor,
      blogs:max
    }
  }
  const mostLikes=blogs=>{
    const reducer=(max,item)=>{
      if(max<item.likes){
        max=item.likes
      }
      return max
    }
    const m=blogs.reduce(reducer,0)
    const k=blogs.filter(b=>b.likes===m)
    const mla=k[0].author
    const bmla=blogs.filter(b=>b.author===mla)
    const rsm=(sum,item)=>{
      return sum=sum+item.likes
    }
    const mlalikes=bmla.reduce(rsm,0)
    return {
      author:mla,
      likes:mlalikes
    } 
  }
  module.exports = {
    dummy,totalLikes,favoriteblog,mostBlogs,mostLikes
  }