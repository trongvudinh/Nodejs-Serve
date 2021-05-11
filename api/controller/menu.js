const log = require('./../FuncLib/FuncLog');
const val_Const = require('./../const/index');
const mongoose= require('mongoose');

const lstRepost = require('./../models/lst_report');
const Menu = require('./../models/menu');
const Catalog = require('./../models/catalog');

exports.GetAllMenu = (req, res, next)=>{
    try {
        Menu.find().populate('list_catalog').then(data=>{
            res.status(200).json(data);
            log.LogInfo(req.originalUrl);
        }).catch(err=>{
            res.status(500).json({ error : err});
            log.LogInfo(err , req, res);
        })
    } catch (error) {
        res.status(500).json({ error : error});
        log.LogError(error, req, res)
    }
}

//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================
//=============================================POST=========================================================

exports.GenerateMenu = async (req, res, next)=>{
    try {
        const listMenu = req.body.menu;
        for (let i = 0; i < listMenu.length; i++) {
            const menu = listMenu[i];    
            const id1 = new mongoose.Types.ObjectId(); 
            const m = new Menu({
                _id : id1,
                id : id1,
                name : menu.name,
                name_re : menu.name,
                name_en : menu.name,
                list_catalog:[],
                usercreat : req.body.usercreat.id,
                userupdate : req.body.usercreat.id,
                creattime:new Date(),
                updatetime:new  Date(),
                show:menu.show,
                abc:{id:1,val:''},
                location:menu.location,
                lst_child:[],
                status:0
            })
            try {
                const t = await m.save();   
            } catch (error) {
                continue;
            }
            var arCatalog = []
            const listCatalog = menu.list_catalog;
            for (let j = 0; j < listCatalog.length; j++) {
                const catalog = listCatalog[j];
                const id2 = new mongoose.Types.ObjectId();
                const cata = new Catalog({
                    _id:id2,
                    id:id2,
                    name:catalog.name,
                    name_re: catalog.name,
                    name_en: catalog.name,
                    urlavatar: '',
                    abc: {id:1,val:''},
                    type: {},
                    id_menu: id1,
                    user_creat : req.body.usercreat.id,
                    creattime: new Date(),
                    updatetime: new Date(),
                    status:0
                });
                try {
                    const t2 = await cata.save();   
                    arCatalog.push(id2);
                } catch (error) {
                }
            }
            console.log(arCatalog);
            console.log(id1)
            Menu.updateOne({id:id1},{list_catalog : arCatalog}).then().catch(err => console.log(err));
        }
        res.status(200).json()

    } catch (error) {
        res.status(500).json({ error : error});
        log.LogError(error, req, res)
    }
}
exports.GetHistoryFindUser = (req, res, next)=>{
    try {
        
    } catch (error) {
        res.status(500).json({ error : error});
        log.LogError(error, req, res)
    }
}