<?php
// Jeff Hannan

include_once("Common/Common.php");

function tableargtopics_multi_select_relation_order_limit($id_argument, $start, $number)
{
    // Wrap in order to limit the result
    $query = "SELECT * FROM ( ".
                "SELECT AT.*, T.name ".
                "FROM tableargtopics AS AT, tabletopics AS T ".
                "WHERE AT.id_argument = '$id_argument' ".
                "AND AT.id_topic = T.id_topic ".
                "ORDER BY AT.selection_count DESC ".
            // Limit the result
            ") ATT LIMIT $start, $number";
        
    return sql_submit_query($query, "tableargtopics_multi_select_relation_order_limit");
}



?> 

