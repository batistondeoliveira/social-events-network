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
    "type": "get",
    "url": "/badge",
    "title": "returns the number of notifications from a user",
    "version": "1.0.0",
    "name": "badge",
    "group": "badge",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-token",
            "description": "<p>header User's token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "E-Mail",
            "description": "<p>header User's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"X-Token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ\"\n   \"E-Mail\": \"fulano@gmail.com\"\n}",
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
            "field": "String",
            "description": "<p>Unauthorized action</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>amount of notifications</p>"
          }
        ]
      }
    },
    "filename": "./Controller/BadgeController.php",
    "groupTitle": "badge"
  },
  {
    "type": "get",
    "url": "/event/{id}",
    "title": "Cancel an event by id",
    "version": "1.0.0",
    "name": "cancelar",
    "group": "event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-token",
            "description": "<p>header User's token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "E-Mail",
            "description": "<p>header User's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"X-Token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ\"\n   \"E-Mail\": \"fulano@gmail.com\"\n}",
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
            "field": "String",
            "description": "<p>Unauthorized action</p>"
          }
        ],
        "402": [
          {
            "group": "402",
            "optional": false,
            "field": "String",
            "description": "<p>Evento não encontrado</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "String",
            "description": "<p>Você só pode cancelar seus próprios eventos</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "mensagem",
            "description": "<p>Evento cancelado com sucesso</p>"
          }
        ]
      }
    },
    "filename": "./Controller/EventController.php",
    "groupTitle": "event"
  },
  {
    "type": "post",
    "url": "/event/mylist",
    "title": "Show event by id",
    "version": "1.0.0",
    "name": "eventList",
    "group": "event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-token",
            "description": "<p>header User's token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "E-Mail",
            "description": "<p>header User's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"X-Token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ\"\n   \"E-Mail\": \"fulano@gmail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "parameters": [
          {
            "group": "parameters",
            "type": "array",
            "optional": false,
            "field": "filters",
            "description": "<p>Array with event filters by date and / or place</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "[     \n  \"data\": \"24/05/2021\"\n  \"place\": \"Shopping\",    \n]",
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
            "field": "String",
            "description": "<p>Unauthorized action</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "json",
            "description": "<p>event object json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": " [\n   {\n       \"id\":\"1\",\n       \"name\":\"Congresso Campinas\",\n       \"date\":\"2021-08-01\",\n       \"time\":\"09:00:00\",\n       \"place\":\"Shopping\",\n       \"type\":\"OWNER\"\n   },\n   {\n       \"id\":\"2\",\n       \"name\":\"Congresso Sao Paulo\",\n       \"date\":\"2021-08-01\",\n       \"time\":\"09:00:00\",\n       \"place\":\"Shopping\",\n       \"type\":\"GUEST\"\n   }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./Controller/EventController.php",
    "groupTitle": "event"
  },
  {
    "type": "post",
    "url": "/event/list",
    "title": "List all available events",
    "version": "1.0.0",
    "name": "getAllActiveEvent",
    "group": "event",
    "parameter": {
      "fields": {
        "parameters": [
          {
            "group": "parameters",
            "type": "array",
            "optional": false,
            "field": "filters",
            "description": "<p>Array with event filters by date and/or place</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "[     \n  \"data\": \"24/05/2021\"\n  \"place\": \"Shopping\",    \n]",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "jsonArray",
            "optional": false,
            "field": "data",
            "description": "<p>List all available events</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "[\n   {\n      \"id\": 1,\n      \"name\":\"Congresso Campinas\",\n      \"date\":\"2021-08-01\",\n      \"time\":\"09:00:00\",\n      \"place\":\"Shopping\"}\n   }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./Controller/EventController.php",
    "groupTitle": "event"
  },
  {
    "type": "get",
    "url": "/event/detail/{id}",
    "title": "Show event by id",
    "version": "1.0.0",
    "name": "getById",
    "group": "event",
    "error": {
      "fields": {
        "402": [
          {
            "group": "402",
            "optional": false,
            "field": "String",
            "description": "<p>Informe o id do evento</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "String",
            "description": "<p>Evento não encontrado</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "json",
            "description": "<p>event object json</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "{\n  \"id\": 1,     \n  \"name\": \"Congresso Campinas\",     \n  \"date\": \"19/08/2021\",\n  \"time\": \"09:00\",\n  \"place\": \"Shopping Campinas\"     \n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controller/EventController.php",
    "groupTitle": "event"
  },
  {
    "type": "get",
    "url": "/event/place/list",
    "title": "List all available place",
    "version": "1.0.0",
    "name": "placeList",
    "group": "event",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "jsonArray",
            "optional": false,
            "field": "data",
            "description": "<p>List all available place</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "[\n  {\"place\":\"Place 1\"},\n  {\"place\":\"Place2\"}\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./Controller/EventController.php",
    "groupTitle": "event"
  },
  {
    "type": "patch",
    "url": "/invite/event",
    "title": "respond to event participation request",
    "version": "1.0.0",
    "name": "replyInvitation",
    "group": "event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-token",
            "description": "<p>header User's token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "E-Mail",
            "description": "<p>header User's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"X-Token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ\"\n   \"E-Mail\": \"fulano@gmail.com\"\n}",
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
            "field": "String",
            "description": "<p>Unauthorized action</p>"
          }
        ],
        "402": [
          {
            "group": "402",
            "optional": false,
            "field": "String",
            "description": "<p>ID do evento não informado</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "String",
            "description": "<p>Evento não encontrado</p>"
          }
        ],
        "405": [
          {
            "group": "405",
            "optional": false,
            "field": "String",
            "description": "<p>Convite não encontrado</p>"
          }
        ],
        "406": [
          {
            "group": "406",
            "optional": false,
            "field": "InvalidDateException",
            "description": "<p>Você já não pode mais confirmar esse evento</p>"
          }
        ],
        "407": [
          {
            "group": "407",
            "optional": false,
            "field": "InvalidTypeException",
            "description": "<p>Conteúdo do campo Status do Evento é inválido</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Evento respondido com sucesso</p>"
          }
        ]
      }
    },
    "filename": "./Controller/InviteEventController.php",
    "groupTitle": "event"
  },
  {
    "type": "post",
    "url": "/event",
    "title": "Save a new event",
    "version": "1.0.0",
    "name": "save",
    "group": "event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-token",
            "description": "<p>header User's token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "E-Mail",
            "description": "<p>header User's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"X-Token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ\"\n   \"E-Mail\": \"fulano@gmail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "parameters": [
          {
            "group": "parameters",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>User object to be added to the database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "{     \n  \"user\": \"fulano@gmail.com\"\n  \"name\": \"Congresso Campinas\",\n  \"description\": \"Participação especial de palestrantes famosos\",\n  \"date\": \"19/08/2021\",\n  \"time\": \"09:00\",\n  \"place\": \"Shopping Campinas\"\n}",
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
            "field": "String",
            "description": "<p>Unauthorized action</p>"
          }
        ],
        "402": [
          {
            "group": "402",
            "optional": false,
            "field": "String",
            "description": "<p>Usuário não encontrado</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "InvalidDateException",
            "description": "<p>A data do evento não pode ser menor que a data atual</p>"
          }
        ],
        "405": [
          {
            "group": "405",
            "optional": false,
            "field": "InvalidTypeException",
            "description": "<p>Tipo do campo %s inválido</p>"
          }
        ],
        "406": [
          {
            "group": "406",
            "optional": false,
            "field": "MessageError",
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
            "type": "String",
            "optional": false,
            "field": "json",
            "description": "<p>Persisted user json object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "{\n  \"id\": 1,\n  \"user\": \"fulano@gmail.com\"\n  \"name\": \"Congresso Campinas\",\n  \"description\": \"Participação especial de palestrantes famosos\",\n  \"date\": \"19/08/2021\",\n  \"time\": \"09:00\",\n  \"place\": \"Shopping Campinas\"     \n}",
          "type": "json"
        }
      ]
    },
    "filename": "./Controller/EventController.php",
    "groupTitle": "event"
  },
  {
    "type": "get",
    "url": "/friendship/event/invite/{idEvento}",
    "title": "List all your friends who have not been invited to an event",
    "version": "1.0.0",
    "name": "inviteEventList",
    "group": "friendship",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-token",
            "description": "<p>header User's token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "E-Mail",
            "description": "<p>header User's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"X-Token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ\"\n   \"E-Mail\": \"fulano@gmail.com\"\n}",
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
            "field": "String",
            "description": "<p>Unauthorized action</p>"
          }
        ],
        "402": [
          {
            "group": "402",
            "optional": false,
            "field": "String",
            "description": "<p>ID do evento não informado</p>"
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
            "field": "data",
            "description": "<p>List all available friends</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "\n[\n  {\n    \"name\": \"fulano\",\n    \"email\": \"fulano@yahoo.com.br\",\n    \"type\": \"Owner\"\n  },\n  {\n    \"name\": \"Beltrano\",\n    \"email\": \"beltrano@yahoo.com.br\",\n    \"type\": \"Friendship\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./Controller/FriendshipController.php",
    "groupTitle": "friendship"
  },
  {
    "type": "get",
    "url": "/friendship",
    "title": "List all your friends",
    "version": "1.0.0",
    "name": "list",
    "group": "friendship",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-token",
            "description": "<p>header User's token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "E-Mail",
            "description": "<p>header User's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"X-Token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ\"\n   \"E-Mail\": \"fulano@gmail.com\"\n}",
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
            "field": "String",
            "description": "<p>Unauthorized action</p>"
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
            "field": "data",
            "description": "<p>List all available friends</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "\n[\n  {\n    \"name\": \"fulano\",\n    \"email\": \"fulano@yahoo.com.br\",\n    \"type\": \"Owner\"\n  },\n  {\n    \"name\": \"Beltrano\",\n    \"email\": \"beltrano@yahoo.com.br\",\n    \"type\": \"Friendship\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "./Controller/FriendshipController.php",
    "groupTitle": "friendship"
  },
  {
    "type": "post",
    "url": "/friendship/undo",
    "title": "undo friendship",
    "version": "1.0.0",
    "name": "undoFriendship",
    "group": "friendship",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-token",
            "description": "<p>header User's token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "E-Mail",
            "description": "<p>header User's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"X-Token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ\"\n   \"E-Mail\": \"fulano@gmail.com\"\n}",
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
            "field": "String",
            "description": "<p>Unauthorized action</p>"
          }
        ],
        "402": [
          {
            "group": "402",
            "optional": false,
            "field": "String",
            "description": "<p>Erro ao desfazer amizade</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Amizade desfeita com sucesso</p>"
          }
        ]
      }
    },
    "filename": "./Controller/FriendshipController.php",
    "groupTitle": "friendship"
  },
  {
    "type": "get",
    "url": "/invite/event",
    "title": "invites someone to be your friend",
    "version": "1.0.0",
    "name": "invite",
    "group": "invite_event",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-token",
            "description": "<p>header User's token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "E-Mail",
            "description": "<p>header User's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"X-Token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ\"\n   \"E-Mail\": \"fulano@gmail.com\"\n}",
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
            "field": "String",
            "description": "<p>Unauthorized action</p>"
          }
        ],
        "402": [
          {
            "group": "402",
            "optional": false,
            "field": "String",
            "description": "<p>ID do evento não informado</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "String",
            "description": "<p>Nenhum amigo informado para enviar o convite</p>"
          }
        ],
        "405": [
          {
            "group": "405",
            "optional": false,
            "field": "InvalidTypeException",
            "description": "<p>Conteúdo do campo Status do Evento é inválido</p>"
          }
        ],
        "406": [
          {
            "group": "406",
            "optional": false,
            "field": "MessageError",
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
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Solicitação de convite de evento enviado</p>"
          }
        ]
      }
    },
    "filename": "./Controller/InviteEventController.php",
    "groupTitle": "invite_event"
  },
  {
    "type": "get",
    "url": "/invite/friendship/{email}",
    "title": "invites someone to be your friend",
    "version": "1.0.0",
    "name": "invite",
    "group": "invite_friendship",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-token",
            "description": "<p>header User's token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "E-Mail",
            "description": "<p>header User's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"X-Token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ\"\n   \"E-Mail\": \"fulano@gmail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "parameters": [
          {
            "group": "parameters",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "String",
            "description": "<p>Unauthorized action</p>"
          }
        ],
        "402": [
          {
            "group": "402",
            "optional": false,
            "field": "String",
            "description": "<p>Informe um e-mail válido</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "String",
            "description": "<p>Você não pode enviar uma solicitação de amizade para você mesmo</p>"
          }
        ],
        "405": [
          {
            "group": "405",
            "optional": false,
            "field": "String",
            "description": "<p>Vocês já são amigos</p>"
          }
        ],
        "406": [
          {
            "group": "406",
            "optional": false,
            "field": "EmailException",
            "description": "<p>Erro ao enviar o e-mail</p>"
          }
        ],
        "407": [
          {
            "group": "407",
            "optional": false,
            "field": "MessageError",
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
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Email de solicitação de convite de amizade enviada</p>"
          }
        ],
        "201": [
          {
            "group": "201",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>Solicitação de convite enviada</p>"
          }
        ]
      }
    },
    "filename": "./Controller/InviteFriendshipController.php",
    "groupTitle": "invite_friendship"
  },
  {
    "type": "patch",
    "url": "/invite/friendship",
    "title": "responds to a friendship invitation",
    "version": "1.0.0",
    "name": "replyInvitation",
    "group": "invite_friendship",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-token",
            "description": "<p>header User's token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "E-Mail",
            "description": "<p>header User's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"X-Token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ\"\n   \"E-Mail\": \"fulano@gmail.com\"\n}",
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
            "field": "String",
            "description": "<p>Unauthorized action</p>"
          }
        ],
        "402": [
          {
            "group": "402",
            "optional": false,
            "field": "String",
            "description": "<p>ID do amigo não informado</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "String",
            "description": "<p>Amigo não encontrado</p>"
          }
        ],
        "405": [
          {
            "group": "405",
            "optional": false,
            "field": "String",
            "description": "<p>Convite não encontrado</p>"
          }
        ],
        "406": [
          {
            "group": "406",
            "optional": false,
            "field": "String",
            "description": "<p>Ocorreu um erro inesperado</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Convite negado com sucesso</p>"
          }
        ],
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Vocês já são amigos</p>"
          }
        ],
        "202": [
          {
            "group": "202",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Convite aceito com sucesso</p>"
          }
        ]
      }
    },
    "filename": "./Controller/InviteFriendshipController.php",
    "groupTitle": "invite_friendship"
  },
  {
    "type": "get",
    "url": "/notification",
    "title": "returns user notifications",
    "version": "1.0.0",
    "name": "notification",
    "group": "notification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-token",
            "description": "<p>header User's token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "E-Mail",
            "description": "<p>header User's email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"X-Token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ\"\n   \"E-Mail\": \"fulano@gmail.com\"\n}",
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
            "field": "String",
            "description": "<p>Unauthorized action</p>"
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
            "field": "data",
            "description": "<p>List all notifications</p>"
          }
        ]
      }
    },
    "filename": "./Controller/NotificationController.php",
    "groupTitle": "notification"
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "User login",
    "version": "1.0.0",
    "name": "login",
    "group": "user",
    "parameter": {
      "fields": {
        "parameters": [
          {
            "group": "parameters",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "parameters",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password to login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "{     \n  \"email\": \"fulano@gmail.com\",\n  \"password\": \"123456\",     \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "402": [
          {
            "group": "402",
            "optional": false,
            "field": "MessageError",
            "description": "<p>Usuário e/ou senha inválido</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "String",
            "description": "<p>Generated validation token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJHlGc0JJN2VvNjdSTmc4SU9DeHhUQk95YVBzWmpCZGZtUGxDVWtkTGdIQXFta01FNm4zT3dlIiwiaWQiOjEsImlhdCI6MTYwNjA5NjU2MywiZXhwIjoxNjA2MTAwMTYzfQ.6huB7zuB6Mo9jUWVvILad9Jd-SvTP9EqKZgmQjP6Hj4",
          "type": "json"
        }
      ]
    },
    "filename": "./Controller/UserController.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/logout",
    "title": "User logout",
    "version": "1.0.0",
    "name": "logout",
    "group": "user",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-token",
            "description": "<p>header User's token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n   \"X-Token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjoiJDJ5JDEwJDRVcWQyWWtlYlQ0b0R0VDVmc3JKc2V1SGdKOEhrOTZVZzN5VHZrbUc0MlhGOWRyeVBuOVF1IiwiaWQiOjEsImlhdCI6MTYwNjE4MTcxOCwiZXhwIjoxNjA2MTg1MzE4fQ.MgVgpZF_pCUBlXVyvT8SOU708y2-1nqEdxGJkXImucQ\"     \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "String",
            "description": "<p>Logout efetuado com sucesso</p>"
          }
        ]
      }
    },
    "filename": "./Controller/UserController.php",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/user",
    "title": "Save a new user",
    "version": "1.0.0",
    "name": "save",
    "group": "user",
    "parameter": {
      "fields": {
        "parameters": [
          {
            "group": "parameters",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>User object to be added to the database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemple Value",
          "content": "{\n  \"name\": \"Fulano\",\n  \"email\": \"fulano@gmail.com\",\n  \"password\": \"123456\",\n  \"bio\": \"\",\n  \"profile_picture\": \"\",\n  \"city\": \"Fulano City\",\n  \"state\": \"MG\",\n  \"idUserInvitedBy\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "405": [
          {
            "group": "405",
            "optional": false,
            "field": "MessageError",
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
            "type": "String",
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
