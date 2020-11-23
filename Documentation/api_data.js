define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./Documentation/main.js",
    "group": "C:\\xampp\\htdocs\\social-events-network\\Documentation\\main.js",
    "groupTitle": "C:\\xampp\\htdocs\\social-events-network\\Documentation\\main.js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/user/save",
    "title": "Save a new user",
    "version": "1.0.0",
    "name": "save",
    "group": "user",
    "parameter": {
      "fields": {
        "parameters": [
          {
            "group": "parameters",
            "type": "jsonArray",
            "optional": false,
            "field": "body",
            "description": "<p>User object to be added to the database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "{\n  \"name\": \"Fulano\",\n  \"email\": \"fulano@gmail.com\",\n  \"password\": \"123456\",\n  \"bio\": \"\",\n  \"profile_picture\": \"\",\n  \"city\": \"Fulano City\",\n  \"state\": \"MG\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Exception",
            "description": "<p>Validation error message</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "jsonArray",
            "optional": false,
            "field": "json",
            "description": "<p>Persisted user json object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "{\n  \"id\": 1,\n  \"name\": \"Fulano\",\n  \"email\": \"fulano@gmail.com\",\n  \"password\": \"123456\",\n  \"bio\": \"\",\n  \"profile_picture\": \"\",\n  \"city\": \"Fulano City\",\n  \"state\": \"MG\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controller/UserController.php",
    "groupTitle": "user"
  }
] });
