class UserPreset {
    constructor() {

        this.houseIdFirst = 1000;
        this.objects = [];

        this.data = {
            Interior3DOnline : { 
                Camera: {
                    X: 0.0,
                    Y: 0.0,
                    Z: 0.0,
                    AngleX: 90.0,
                    AngleY: 90.0
                },
                ShowAllLevels: true,
                ShowAlphaWalls: false,
                SkyBox: {
                    LandTexture: "Textures/SkyBox/Land/Default.png",
                    LandTextureScale: 1.0,
                    LandTextureAlpha: 1.0,
                    SkyTexture: "Textures/SkyBox/Sky/Default.png",
                    SkyTextureScale : 1.0
                },
                ActiveHouseIndex: 0,
                ActiveHouseLevel: 0,
                Houses: []
            } 
        } 
    }
  
    toJSON() {
      return JSON.stringify(this.data);
    }

    addHouse() {
        // Добавление новых данных в объект 
        let ID = (this.houseIdFirst + this.objects.length).toString();
        this.objects.push(ID);
        this.data.Interior3DOnline.Houses.push(
        {
            ID,
            Name: "",
            Levels: [],

        });
     
        return ID
    }

    addLevel(Name, house_id) {

        let ID = (this.houseIdFirst + this.objects.length).toString();
        this.objects.push(ID);  
        this.getHouseById(house_id).Levels.push({
            ID,
            Type: "classic",
            Height: 2.7,
            OverlapHeight: 0.2,
            FloorHeight: 0.15,
            CeilingHeight: 0.1,
            WallOutTexture: "Textures/WallsOut/Brick/001.png",
            WallOutTextureScale: 1.0,
            WallInTexture: "Textures/WallsIn/Paper/001.png",
            WallInTextureScale: 1.0,
            GroundDepth: 0.0,
            Name,
            Rooms: [],
    
        });   
        
        return ID
    }

    addRoom(Name, house_id, level_id, Area, IsClockWise, Zoom, Center){
        let ID = (this.houseIdFirst + this.objects.length).toString()
        this.objects.push(ID);      
        this.getLevelById(house_id, level_id).Rooms.push({
            ID,
            Name,
            FloorHeight: 0.2,
            CeilingHeight: 0.15,
            WallOutDef: true,
            WallOutTexture: "",
            WallOutTextureScale: 1,
            WallInDef: true,
            WallInTexture: "",
            WallInTextureScale: 1.0,
            FloorTexture: "Textures/Floor/Parquet/001.png",
            FloorTextureScale: 1.0,
            FloorTextureAngle: 45.0,
            CeilingTexture: "Textures/Ceil/Tile/001.png",
            CeilingTextureScale: 1.0,
            CeilingTextureAngle: 0.0,
            ShowSquare: true,
            ShowCeiling: true,
            Walls: [],
            Area,
            IsClockWise,
            Zoom,
            Center
    
        }); 
        
        return ID;
    }

    addWalls(points, house_id, level_id, room_id) {

        let {Walls} = this.getRoomById(house_id, level_id, room_id);

        for (let index = 0; index < points.length; index++) {

            let ID = (this.houseIdFirst + this.objects.length).toString();
            this.objects.push(ID);

            if (!points[ index + 1 ]) { break; }
            const elementNext = points[ index + 1 ];
            const element = points[ index ];
            Walls.push({
            
                ID,
                StartPoint: {
                    "X": element.x,
                    "Y":  element.y
                },
                EndPoint: {
                    "X": elementNext.x,
                    "Y": elementNext.y
                },
                Height: 2.7,
                Thickness: 0.3,
                Visible: true,
                TypeResizeWidth: 0,
                TypeResizeThickness: 0,
                WallOutDef: true,
                WallOutTexture: "",
                WallOutTextureScale: 1.0,
                WallInDef: true,
                WallInTexture: "",
                WallInTextureScale: 1.0,
                Objects: [
                   
                ]
            });
        } 
        
        
    }

    addObjectToRoom(object_type, house_id, level_id, room_id) {
        return this.addObjectToArray(object_type, this.getRoomById(house_id, level_id, room_id)["Objects"]);
    }



    addObjectToWall (object_type, wall_id) {
        return this.addObjectToArray(object_type, this.getWallById(wall_id)["Objects"]);
    }

    addObjectToArray(type, array) {

        let ID = (this.houseIdFirst + this.objects.length).toString()
        if (type == "window") {
            array.push(
                {
                    ID,
                    TypeObject: "window",
                    Pos: {
                        X: 1.0,
                        Y: 0.8
                    },
                    Size: {
                        X: 1.3,
                        Y: 1.4,
                        Z: 0.3
                    },
                    ModelPath: "Models/Windows/Simple/Double.fbx",
                    FlipX: false,
                    FlipY: false,
                    FlipZ: false,
                    Textures: [
                        {
                            TextureName: "Frame",
                            TexturePath: "#FFFFFF",
                            TextureScale: 1.0
                        },
                        {
                            TextureName: "Handle",
                            TexturePath: "#FFFFFF",
                            TextureScale: 1.0
                        }
                    ]
                }
            )           
        }
        else if (object_type == "door") {
            wall_objects.push({
                ID,
                TypeObject: "door",
                Pos: {
                    X: 1.0,
                    Y: 0.0
                },
                Size: {
                    X: 1.0,
                    Y: 2.0,
                    Z: 0.3
                },
                ModelPath: "Models/Doors/Simple/Simple.fbx",
                FlipX: true,
                FlipY: false,
                FlipZ: false,
                Textures: [
                    {
                        TextureName: "Frame",
                        TexturePath: "Textures/Objects/Wood/Oak.png",
                        TextureScale: 1.0
                    },
                    {
                        TextureName: "Handle",
                        TexturePath: "#804030",
                        TextureScale: 1.0
                    }
                ]
            })
            
        }
        else if(object_type == "model") {
            wall_objects.push({               
                ID,
                TypeObject: "model",
                Pos: {
                    X: 5.0,
                    Y: 5.0,
                    Z: 0.0
                },
                Size: {
                    X: 2.35,
                    Y: 0.92,
                    Z: 1.05
                },
                ModelPath: "Models/3D/LivingRoom/Sofa.fbx",
                FlipX: false,
                FlipY: false,
                FlipZ: false,
                Textures: [
                    {
                        TextureName: "Material",
                        TexturePath: "Textures/Objects/Textile/Blue.png",
                        TextureScale: 1.0
                    },
                    {
                        TextureName: "Leg",
                        TexturePath: "#FFFFFF",
                        TextureScale: 1.0
                    }
                ]
                
            })
        }

        return ID;
    
    } 

    getWallById(house_id, level_id, room_id, wall_id) {
        return this.getRoomById(house_id, level_id, room_id).Walls.find(obj => obj.ID === wall_id);
    }

    getRoomById(house_id, level_id, room_id) {
        return this.getLevelById(house_id, level_id).Rooms.find(obj => obj.ID === room_id);
    }

    getLevelById(house_id, level_id) {
        return this.getHouseById(house_id).Levels.find(obj => obj.ID === level_id);
    }

    getHouseById(house_id) {
        return this.data.Interior3DOnline.Houses.find(obj => obj.ID === house_id);
    }

    changePositionsRoom(house_id, level_id, room_id, new_points, area, Zoom, Center) {

        let room = this.getRoomById(house_id, level_id, room_id);
        let array = room.Walls;       
        room.Area = area;
        room.Zoom = Zoom;
        room.Center = Center;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const new_pointStart = new_points[ index ];
            const new_pointEnd = new_points[ index + 1 ];
            element.StartPoint.X = new_pointStart.x;
            element.StartPoint.Y = new_pointStart.y;
            element.EndPoint.X = new_pointEnd.x;  
            element.EndPoint.Y = new_pointEnd.y;      
        }
    }
    
    updateScene() {
      
    }
  }