const Eleve = require('../Modele/Eleve.modele');
const Prof = require('../Modele/prof.modele');

exports.getEleve = (req, res) => {
    Eleve.find()
        .then(eleve => {

            res.json(eleve);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });

};
exports.getProf = (req, res) => {

    Prof.find()
        .then(prof => {

            res.json(prof);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};


exports.postEleve = (req, res) => {
    // Validate request

    Eleve.find()
        .then(eleve => {
            var id2;
            if (eleve.length == 0) {
                id2 = 0
            }
            else {

                id2 = parseInt(eleve[eleve.length - 1].id) + 1
            }
            const elv = new Eleve({
                _id: id2,
                nom: req.body.nom || "Untitled Note",
                prenom: req.body.prenom,
                age: req.body.age,
                classe: req.body.classe
            });
            if (req.body.nom && req.body.prenom) {
                elv.save()
                    
                    .then(data => {
                        eleve.push(elv)
                        res.send(eleve);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Note."
                        });
                    });
            };

        })

}

exports.postProf = (req, res) => {
    // Validate request

    Prof.find()
        .then(prof => {
            var id2;
            if (prof.length == 0) {
                id2 = 0
            }
            else {

                id2 = parseInt(prof[prof.length - 1].id) + 1
            }
            const prf = new Prof({
                _id: id2,
                nom: req.body.nom || "Untitled Note",
                prenom: req.body.prenom,
                matiere: { matiere1: req.body.matiere1, matiere2: req.body.matiere1, matiere3: req.body.matiere3 },
                classe: { classe1: req.body.classe1, classe2: req.body.classe2, classe3: req.body.classe3 }
            }); 
            if (req.body.nom && req.body.prenom) {
               
                 prf.save().then(data => {
                     prof.push(prf)
                    res.send(prof)
                 }
                   )
            };

        })
}




exports.put = (req, res) => {
    // Validate Request
    if (!req.body.prenom) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Eleve.findByIdAndUpdate(req.body._id, {
        nom: req.body.nom || "Untitled Note",
        prenom: req.body.prenom
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body._id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
};
// exports.deleteEleve = (req, res) => {
//     Eleve.findByIdAndRemove(req.body._id)
//     .then(eleve => {
//         if(!eleve) {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.body._id
//             });
//         }
//         res.send({message: "Note deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.body._id
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete note with id " + req.body._id
//         });
//     });
// };
exports.deleteProf = (req, res) => {
    Prof.findByIdAndRemove(req.body._id)
        .then(prof => {
            if (!prof) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body._id
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.body._id
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.body._id
            });
        });
};
exports.findOne = (req, res) => {
    const tab = []
    
        Eleve.findById(req.params._id)
        .then(eleve => {
            if (!eleve) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body._id
                });
            }

            Prof.find()
                .then(prof => {
                    tab.push(eleve)
                    for (var i = 0; i < prof.length; i++) {
                        if (prof[i].classe.classe2 == eleve.classe || prof[i].classe.classe1 == eleve.classe || prof[i].classe.classe3 == eleve.classe) {

                            tab.push(prof[i])
                        }
                    }


                    res.send(tab)
                }
                )
            })

        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.body._id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.body._id
            });
        });
};