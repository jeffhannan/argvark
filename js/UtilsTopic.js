    // 
    // Constructor
    // 
function UtilsTopic()
{
}

    // All Names
  

UtilsTopic.prototype.Init = function(eventHandler, dataTopic)
{
    this.eventHandler = eventHandler;
    this.dataTopic = dataTopic;
}
                         

UtilsTopic.prototype.DisplayTopic = function(jqueryElementId, jqueryNewArgInTopicButton)
{
    var jsonData = this.dataTopic.data;
    if (jsonData == null) return;
    
    // Set the topic name, which is stored in the json
    var topicName = jsonData[this.dataTopic.fieldNameTopicName];
    $(jqueryElementId).html(topicName);
    
    // If NewArg button exists, display message on it.
    if (jqueryNewArgInTopicButton != null)
    {
        var createNewArgString = "Create new argument in " + topicName;
        //$(jqueryNewArgInTopicButton).html(createNewArgString);
    }
    /*
    var thisObject = this;
    $.each(jsonData, function(index, entry){
        var topicName = entry[thisObject.dataTopic.fieldNameTopicName];
        
        // Display text
        $(jqueryElementId).html(topicName);
        
        // If NewArg button exists, display message on it.
        if (jqueryNewArgInTopicButton != null)
        {
            var createNewArgString = "Create new argument in " + topicName;
            //$(jqueryNewArgInTopicButton).html(createNewArgString);
        }
    });
    */
}

