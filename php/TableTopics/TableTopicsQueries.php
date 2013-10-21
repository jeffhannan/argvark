<?php
// Jeff Hannan

include_once("Common/Utils.php");
include_once("TableTopics/TableTopicsSQL.php");
    
//
// useful simple functions
//
// Probably only want to enforce this when adding a topic name, not on every retrieval.
function tabletopics_enforce_name_format($topic_name)
{
    // The rules are:
    // Only letters, numbers, and apostrophe, and + . Others will be removed.
    // Underscores become spaces. Only one underscore or space allowed.
    // First letter of each word is capitalised.
    $topic_name = trim($topic_name);
    $topic_name = strtolower($topic_name);
    $topic_name_array = str_split($topic_name);
    $valid_topic_name = "";
    $last_char_a_space = false;
    foreach ($topic_name_array as $topic_name_char){
        $topic_name_char_ascii = ord($topic_name_char);
        
        // Check if the character is valid
        // Ignore invalid characters
        // Replace underscore with space and strip more than one consecutive space
        $valid_char = false;
        $this_char_a_space = false;
        if (($topic_name_char_ascii >= 97) && ($topic_name_char_ascii <= 122)){
            // lowercase okay        
            $valid_char = true;
        }
        if (($topic_name_char_ascii >= 48) && ($topic_name_char_ascii <= 57)){
            // [0,9] okay        
            $valid_char = true;
        }
        else if (($topic_name_char_ascii == 32) || ($topic_name_char_ascii == 95)){
            // space or underscore okay, but convert to space
            $valid_char = true;
            $topic_name_char_ascii = 32;
            $this_char_a_space = true;
        }        
        else if ($topic_name_char_ascii == 39){
            // single quote or + okay
            $valid_char = true;
        }
        // Was going to allow +, but url decoding confuses this by converting a + to a space.
        //else if (($topic_name_char_ascii == 43)){
        //    $valid_char = true;
        //}
        
        // Set $valid_char to false if $consecutive_spaces
        $consecutive_spaces = ($this_char_a_space && $last_char_a_space);
        $valid_char &= !$consecutive_spaces;
        $last_char_a_space = $this_char_a_space;
        
        // If the character is valid, then add it to the new string
        //echo("$topic_name_char:$topic_name_char_ascii:$valid_char:");
        if ($valid_char){
            $topic_name_valid_char = chr($topic_name_char_ascii);
            $valid_topic_name = "$valid_topic_name" . "$topic_name_valid_char";
            //echo("$topic_name_valid_char:$valid_topic_name");
        }                                                                         
        //echo("<br>");
    }
    
    $enforced_topic_name = ucwords($valid_topic_name);
                  
    return $enforced_topic_name;
}


function tabletopics_extract_topic_id($query_result)
{
    $row = mysql_fetch_array($query_result);
    $id_topic = $row['id_topic'];
    
    return array($id_topic);
}


function tabletopics_select_by_enforced_name($topic_name)
{
    $enforced_topic_name = tabletopics_enforce_name_format($topic_name);
    
    list($success, $error_message, 
        $result) = tabletopics_select_by_name($enforced_topic_name);
    
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopics_select_by_enforced_name"); }
            
    return array($success, $error_message, $result); 
}


function tabletopics_insert_enforced_topic($enforced_name_value)
{
    $id_topic = -1;
    
    // If the topic doesn't exist in the database, insert it
    list($success, $error_message, 
        $result_insert_topic) = tabletopics_insert($enforced_name_value);
        
    if ($success){ list($success, $error_message, 
        // Query for the newly inserted topic
        $id_topic) = sql_get_last_insert_id();
    }    
    
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopics_insert_enforced_topic"); }    
    
    return array($success, $error_message, $id_topic); 
}


function tabletopics_get_topic_id($topic_name)
{
    $id_topic = -1;
    
    list($success, $error_message, 
        // Query by name for the topic record - enforce name when searching by name
        $result_select) = tabletopics_select_by_enforced_name($topic_name);
            
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopics_get_topic_id"); }    
            /*
    if ($success){ list($success, $error_message) = 
        // Check the result for a valid record
        sql_check_result($result);
    }    
    */
    if ($success){ 
        // Check the result for a valid record
        $success = sql_rows_found($result_select);        
        if (!$success){$error_message = utils_create_user_error_message("Topic with name " . $topic_name . " not found.");}
    }
    
    if ($success){ list(
        // Extract the topic id from the record
        $id_topic) = tabletopics_extract_topic_id($result_select);
    }
    
    /*
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopics_get_topic_id"); }
        */    
    
    return array($success, $error_message, $id_topic); 
}


function tabletopics_confirm_topic_id($id_topic)
{    
    list($success, $error_message, 
        // Query by id for the topic record
        $result_select) = tabletopics_select_by_id($id_topic);
    
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopics_confirm_topic_id"); }
        /*
    if ($success){ list($success, $error_message) = 
        // Check the result for a valid record
        sql_check_result($result);
    }    
    */
    if ($success){ 
        // Check the result for a valid record
        $success = sql_rows_found($result_select);        
        if (!$success){$error_message = utils_create_user_error_message("Topic with id " . $id_topic . " not found.");}
    }
    
    /*
    if (!$success) { $error_message = utils_prepend_error_message($error_message, 
        "tabletopics_confirm_topic_id"); }
        */
    
    return array($success, $error_message); 
}


function fix_topic_names()
{
    list($success, $error_message, $result_select_all) = tabletopics_select_all();

    // Loop through all topic records
    // Get the name, then set the name    
    if ($success){
        $array_records = array();
        $array_fields = array();
        $record_index = 1;
        while($row = mysql_fetch_array($result_select_all)){
            $id_topic = $row['id_topic'];
            $name = $row['name'];
            
            $enforced_topic_name = tabletopics_enforce_name_format($name);

            list($success, $error_message, $result_update) = tabletopics_update_name($id_topic, $enforced_topic_name);
            
            // till I'm sure it won't break everything   
            //if ($record_index >= 4){
            //    break;
            //}
            
            $record_index++;
        }
    }   
}

?> 
