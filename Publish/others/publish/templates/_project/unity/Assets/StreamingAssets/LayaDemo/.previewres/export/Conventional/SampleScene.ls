{
	"version":"LAYASCENE3D:02",
	"data":{
		"type":"Scene3D",
		"props":{
			"name":"SampleScene",
			"ambientColor":[
				0.212,
				0.227,
				0.259
			],
			"lightmaps":[],
			"enableFog":true,
			"fogStart":0,
			"fogRange":300,
			"fogColor":[
				0.1411765,
				0.1411765,
				0.1411765
			]
		},
		"child":[
			{
				"type":"DirectionLight",
				"instanceID":0,
				"props":{
					"name":"default_light",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						3,
						0
					],
					"rotation":[
						0.1093816,
						0.8754261,
						0.4082179,
						-0.2345697
					],
					"scale":[
						1,
						1,
						1
					],
					"intensity":1,
					"lightmapBakedType":0,
					"color":[
						1,
						1,
						1
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"Sprite3D",
				"instanceID":1,
				"props":{
					"name":"main_camera",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					]
				},
				"components":[],
				"child":[
					{
						"type":"Camera",
						"instanceID":2,
						"props":{
							"name":"camera",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								0,
								7,
								-10
							],
							"rotation":[
								0,
								0.9659258,
								0.2588191,
								0
							],
							"scale":[
								1,
								1,
								1
							],
							"clearFlag":0,
							"orthographic":false,
							"orthographicVerticalSize":10,
							"fieldOfView":60,
							"enableHDR":true,
							"nearPlane":0.3,
							"farPlane":200,
							"viewport":[
								0,
								0,
								1,
								1
							],
							"clearColor":[
								0.1415094,
								0.1415094,
								0.1415094,
								0
							]
						},
						"components":[],
						"child":[]
					}
				]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":3,
				"props":{
					"name":"default_cube_01",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						1.27,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"materials":[
						{
							"path":"Assets/_res/mat/blue.lmat"
						}
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":4,
				"props":{
					"name":"floor",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						-0.5,
						0
					],
					"rotation":[
						-0.7071068,
						0,
						0,
						-0.7071068
					],
					"scale":[
						100,
						100,
						1
					],
					"meshPath":"Library/unity default resources-Quad.lm",
					"enableRender":true,
					"materials":[
						{
							"path":"Assets/_res/mat/floor.lmat"
						}
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"instanceID":5,
				"props":{
					"name":"default_cube_02",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						2,
						1,
						2
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"materials":[
						{
							"path":"Assets/_res/mat/blue.lmat"
						}
					]
				},
				"components":[],
				"child":[]
			}
		]
	}
}