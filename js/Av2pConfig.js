// Constructor
function Config()
{
    // Site url
    this.m_siteUrl = "http://localhost/av2p";
    //this.m_siteUrl = "http://www.argvark.org";


    // Site names
    this.m_topicIdVarName = "topic_id";
    this.m_topicNameVarName = "topic";
    this.m_argIdVarName = "arg";
    
    // Urls
    //this.m_argUrl = this.m_siteUrl + "?" + this.m_argIdVarName + "=";
    //this.m_topicIdUrl = this.m_siteUrl + "?" + this.m_topicIdVarName + "=";
    //this.m_topicNameUrl = this.m_siteUrl + "?" + this.m_topicNameVarName + "=";

    
    // Core web strings
    this.m_phpFolder = "/php/";
    this.m_phpExt = ".php";
    this.m_sitePhpUrl = this.m_siteUrl + this.m_phpFolder;
    
    this.m_loadArgAPI = "LoadArg";
    this.m_loadArgLinksAPI = "LoadArgLinks";
    this.m_loadArgListAPI = "LoadArgList";
    this.m_loadArgTopicsAPI = "LoadArgTopics";
    this.m_loadTopicAPI = "LoadTopic";
    this.m_loadTopicLinksAPI = "LoadTopicLinks";
    this.m_addArgAPI = "AddArg";
    this.m_addArgLinkAPI = "AddArgLink";
    this.m_addTopicLinkAPI = "AddTopicLink";     
    this.m_addArgTopicAPI = "AddArgTopic";
    this.m_selectTopicLinkAPI = "SelectTopicLink";
    this.m_selectArgLinkAPI = "SelectArgLink";
    this.m_selectArgTopicAPI = "SelectArgTopic";
    this.m_selectArgInTopicAPI = "SelectArgInTopic";
    
    // Composed strings
    this.m_loadArgPhp = this.BuildUrl(this.m_loadArgAPI);           
    this.m_loadArgLinksPhp = this.BuildUrl(this.m_loadArgLinksAPI);
    this.m_loadArgListPhp = this.BuildUrl(this.m_loadArgListAPI);
    this.m_loadArgTopicsPhp = this.BuildUrl(this.m_loadArgTopicsAPI);
    this.m_loadTopicPhp = this.BuildUrl(this.m_loadTopicAPI);           
    this.m_loadTopicLinksPhp = this.BuildUrl(this.m_loadTopicLinksAPI);           
    this.m_addArgPhp = this.BuildUrl(this.m_addArgAPI);           
    this.m_addArgLinkPhp = this.BuildUrl(this.m_addArgLinkAPI);
    this.m_addTopicLinkPhp = this.BuildUrl(this.m_addTopicLinkAPI);           
    this.m_addArgTopicPhp = this.BuildUrl(this.m_addArgTopicAPI);
    this.m_selectTopicLinkPhp = this.BuildUrl(this.m_selectTopicLinkAPI);
    this.m_selectArgLinkPhp = this.BuildUrl(this.m_selectArgLinkAPI);
    this.m_selectArgTopicPhp = this.BuildUrl(this.m_selectArgTopicAPI);
    this.m_selectArgInTopicPhp = this.BuildUrl(this.m_selectArgInTopicAPI);

    // Just use this to ensure I can easily find uses of user
    this.m_userId = 0;
    
    // Have a default root topic
    this.m_rootTopicName = "Root";
    this.m_rootTopicId = 1;
    this.m_rootArgId = 1; // not so sure about this one
    
    // If changing this, also need to change the php
    this.m_noOfArgsToDisplay = 20;
    this.m_noOfChildTopicLinksToDisplay = 8;
    this.m_noOfParentTopicLinksToDisplay = 3;
    this.m_noOfArgTopicsToDisplay = 5;
    this.m_noOfChildArgLinksToDisplay = 10;
    this.m_noOfParentArgLinksToDisplay = 3;
    
    this.m_displayDebug = false;
    this.m_debugOutputJQID = "#debugOutput";
}

Config.prototype.BuildUrl = function(apiName)
{
    var url = this.m_sitePhpUrl + apiName + this.m_phpExt;
    return url;
}

