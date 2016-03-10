<?php

    header('Content-Type: text/xml');
    $dom = new DOMDocument('1.0', 'utf-8');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;
    $root = $dom->createElement('result');
    $dom->appendChild($root);
    $companies = get_companies();
    foreach ($companies as $company) {
        // Create elements
        $company_root = $dom->createElement('company');
        $year = $dom->createElement('year');
        $rank = $dom->createElement('rank');
        $revenue = $dom->createElement('revenue');
        $profit = $dom->createElement('profit');
        $name = $dom->createElement('name');
        // Append children
        $root->appendChild($company_root); 
        $company_root->appendChild($year);
        $company_root->appendChild($rank);
        $company_root->appendChild($revenue);
        $company_root->appendChild($profit);
        $company_root->appendChild($name);
        // Append child node information  
        $year->appendChild($dom->createTextNode($company["Year"]));
        $rank->appendChild($dom->createTextNode($company["Rank"]));
        $revenue->appendChild($dom->createTextNode($company["Revenue"]));
        $profit->appendChild($dom->createTextNode($company["Profit"]));
        $name->appendChild($dom->createTextNode($company["Company"]));
    }
    echo $dom->saveHTML();
    
    function get_companies() {
        $response = file_get_contents('http://www.cis.gvsu.edu/~scrippsj/cs371/hw/fortune500.json');
        $fortune500 = json_decode($response, true);
        return $fortune500['result'];
    }
?>
