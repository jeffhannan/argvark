<?php
// Jeff Hannan

function TableArgTopicsSelectById($id_tag)
{
    $query = "SELECT * ".
        "FROM tableargtopics ".
        "WHERE id_tag = '$id_tag' ";
        
    return sql_submit_query($query, "TableArgTopicsSelectById");
}

// Would only expect 1 row if task/keyword pair found
// Failure outputs error
function tableargtopics_select($id_argument, $id_topic)
{
    $query = "SELECT * ".
        "FROM tableargtopics ".
        "WHERE id_argument = '$id_argument' ".
        "AND id_topic = '$id_topic' ";
        
    return sql_submit_query($query, "tableargtopics_select");
}

function TableArgTopicsSelectByArgument($id_argument)
{
    $query = "SELECT * ".
        "FROM tableargtopics ".
        "WHERE id_argument = '$id_argument' ";
        
    return sql_submit_query($query, "TableArgTopicsSelectByArgument");
}

function TableArgTopicsSelectByTopic($id_topic)
{
    $query = "SELECT * ".
        "FROM tableargtopics ".
        "WHERE id_topic = '$id_topic' ";
        
    return sql_submit_query($query, "TableArgTopicsSelectByTopic");
}

function TableArgTopicsSelectByIdArrayString($topicIdArrayString)
{
    $query = "SELECT DISTINCT * ".
        "FROM tableargtopics ".
        "WHERE id_topic IN ($topicIdArrayString) ";
        
    return sql_submit_query($query, "TableArgTopicsSelectByIdArrayString");
}

function TableArgTopicsSelectArgByIdArrayString($topicIdArrayString)
{
    $query = "SELECT DISTINCT id_argument ".
        "FROM tableargtopics ".
        "WHERE id_topic IN ($topicIdArrayString) ";
        
    return sql_submit_query($query, "TableArgTopicsSelectArgByIdArrayString");
}

function TableArgTopicsSelectArgByIdArrayStringLimit($topicIdArrayString, $start, $number)
{
    $query = "SELECT DISTINCT id_argument ".
        "FROM tableargtopics ".
        "WHERE id_topic IN ($topicIdArrayString) ".
        "LIMIT $start, $number";
        
    return sql_submit_query($query, "TableArgTopicsSelectArgByIdArrayStringLimit");
}

function TableArgTopicsSelectArgByIdArrayStringLimit2($topicId, $topicIdArrayString, $start, $number)
{
    // Want to select all args tagged with all topics in $topicIdArrayString
    // But want just those tagged with $topicId first.
    
    // Wrap in order to limit the result
    $query = "SELECT A.id_argument ".
        "FROM ( ".
            // Firstly, get all args tagged with $topicId
            "SELECT id_argument ".
            "FROM tableargtopics ".
            "WHERE id_topic = '$topicId' ".
            "ORDER BY selection_count DESC ".
            // Union this with all args tagged with all args in $topicIdArrayString, stripping duplicates.
                "UNION ".
            "SELECT DISTINCT id_argument ".
            "FROM tableargtopics ".
            "WHERE id_topic IN ($topicIdArrayString) ".
            "ORDER BY selection_count DESC ".
        ") AS A ".
        "LIMIT $start, $number";
        
    return sql_submit_query($query, "TableArgTopicsSelectArgByIdArrayStringLimit2");
}

//function TableArgTopicsSelectArgByIdArrayStringLimit3($topicId, $topicIdArrayString, $start, $number)
function tableargtopics_select_arg_by_id_array_string_limit($topicId, $topicIdArrayString, $start, $number)
{
    // Want to select all args tagged with all topics in $topicIdArrayString
    // But want just those tagged with $topicId first.
    
    // Wrap in order to limit the result
    $query = "SELECT * FROM ( ".
                // Wrap and alias each query, to do ORDER BY, before doing UNION.
                "SELECT * FROM ( ".
                    // Get all args tagged with $topicId
                    "SELECT id_argument ".
                    "FROM tableargtopics ".
                    "WHERE id_topic = '$topicId' ".
                    "ORDER BY selection_count DESC ".
                ") T1 ".
                    "UNION ".
                "SELECT * FROM ( ".    
                    // Get all args tagged with all args in $topicIdArrayString, stripping duplicates.
                    "SELECT DISTINCT id_argument ".
                    "FROM tableargtopics ".
                    "WHERE id_topic IN ($topicIdArrayString) ".
                    "ORDER BY selection_count DESC ".
                ") T2 ".
            // Limit the result
            ") T3 LIMIT $start, $number";
        
    return sql_submit_query($query, "tableargtopics_select_arg_by_id_array_string_limit");
}


function tableargtopics_insert($id_argument, $id_topic)
{
    $query = "INSERT INTO tableargtopics (id_argument, id_topic) ".
        "VALUES ('$id_argument', '$id_topic') ";
    
    return sql_submit_query($query, "tableargtopics_insert");
}
      
function TableArgTopicsDelete($id_tag)
{
    $query = "DELETE FROM tableargtopics ".
        "WHERE id_tag = $id_tag ".
        "LIMIT 1 ";
    
    return sql_submit_query($query, "TableArgTopicsDelete");
}
  
function tableargtopics_selection_count_increment($id_tag)
{
    $query = "UPDATE tableargtopics ".
        "SET selection_count = selection_count + 1 ".
        "WHERE id_tag = '$id_tag' ";
    
    return sql_submit_query($query, "tableargtopics_selection_count_increment");
}
      


?> 
