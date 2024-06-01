const shortid = require('shortid');
const URL = require('../models/url');


async function handleGenerateNewShortURL(req,res){
const body = req.body;
if(!body.url) return res.status(400).json({error:'url is required'})


await URL.create({
shortId : shortid,
redirectURL:body.url,
visitedHistory:[],
    });
     return res.render('home' , {id  : shortid})
}



async function handleGetAnalytics(req,res)
{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks : result.visitHistory.length , analytics: result.visitHistory,})
}



module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}