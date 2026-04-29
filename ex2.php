<?php

#[Attribute]
class TraceableSearch {}

$tree = [
    [
        "name" => "Техніка",
        "children" => [
            [
                "name" => "Комп’ютери",
                "children" => [
                    ["name" => "Ноутбуки", "children" => []],
                    ["name" => "ПК", "children" => []]
                ]
            ],
            [
                "name" => "Телефони",
                "children" => [
                    ["name" => "Смартфони", "children" => []],
                    ["name" => "Кнопкові", "children" => []]
                ]
            ]
        ]
    ],
    [
        "name" => "Одяг",
        "children" => [
            ["name" => "Чоловічий", "children" => []],
            ["name" => "Жіночий", "children" => []]
        ]
    ]
];

$trace = [];

function logNode($node) {
    global $trace;
    $trace[] = $node["name"];
}

#[TraceableSearch]
function findCategory($tree, $name, $callback) {
    foreach ($tree as $node) {
        $callback($node);

        if ($node["name"] === $name) {
            return $node;
        }

        if (!empty($node["children"])) {
            $result = findCategory($node["children"], $name, $callback);
            if ($result) return $result;
        }
    }
    return null;
}

$result = null;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $search = $_POST["search"] ?? "";

    $result = findCategory($tree, $search, "logNode");

    $ref = new ReflectionFunction("findCategory");
    $attrs = $ref->getAttributes();

    if ($attrs) {
        echo "<h3>Trace:</h3><ul>";
        foreach ($GLOBALS["trace"] as $t) {
            echo "<li>$t</li>";
        }
        echo "</ul>";
    }
}

?>

<form method="post">
    <input type="text" name="search" placeholder="Category name">
    <button type="submit">Search</button>
</form>

<?php

if ($result) {
    echo "<p>Знайдено: " . $result["name"] . "</p>";
} elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "<p>Не знайдено</p>";
}

?>