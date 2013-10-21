<?php
// Jeff Hannan

include_once("Common/UtilsSQL.php");

// Would only expect 1 row if id found
function tabletopics_select_by_id($id_topic)
{
    $query = "SELECT * ".
        "FROM tabletopics ".
        "WHERE id_topic = '$id_topic' ";
        
    return sql_submit_query($query, "tabletopics_select_by_id");
}


// Would only expect 1 row if name found
function tabletopics_select_by_name($name)
{
    $query = "SELECT * ".
        "FROM tabletopics ".
        "WHERE name = '$name' ";
        
    return sql_submit_query($query, "tabletopics_select_by_name");
}


function tabletopics_insert($name)
{
    $query = "INSERT INTO tabletopics (name) ".
        "VALUES ('$name') ";
    
    return sql_submit_query($query, "tabletopics_insert");
}


function tabletopics_update_name($id_topic, $edited_name)
{
    $query = "UPDATE tabletopics ".
        "SET name = '$edited_name' ".
        "WHERE id_topic = '$id_topic' ";
    
    return sql_submit_query($query, "tabletopics_update_name");
}


function tabletopics_select_all()
{
    $query = "SELECT * ".
        "FROM tabletopics ";
        
    return sql_submit_query($query, "tabletopics_select_all");
}

function tabletopics_delete($id_topic)
{
    $query = "DELETE ".
        "FROM tabletopics ".
        "WHERE id_topic = '$id_topic' ";
    
    return sql_submit_query($query, "tabletopics_delete");
}


?> 
