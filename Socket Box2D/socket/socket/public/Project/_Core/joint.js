//mouse functions are shared
var mouseJointLoaded = false;
var mouseJointArray = [];

var Joint = window.Joint = function (bodyA, bodyB, details, declaration) {

    if (declaration)
        this.preLoad = declaration(details, false);


    switch (details.type) {
        case "mouse": //#region mouse
            if (mouseJointLoaded) {
                mouseJointArray.push(bodyA.body);
            }
            else {
                var joint = null;
                var mouseJointLoaded = true;
                mouseJointArray.push(bodyA.body);
                function calculateWorldPosition(e) {
                    return point = {
                        x: (e.offsetX || e.layerX) / box.scale,
                        y: (e.offsetY || e.layerY) / box.scale
                    };
                }
                box.element.addEventListener("mousedown", function (e) {
                    e.preventDefault();
                    var point = calculateWorldPosition(e);
                    box.world.QueryPoint(function (fixture) {
                        bodyB = fixture.GetBody().GetUserData();
                    }, point);
                });
                box.element.addEventListener("mousemove", function (e) {
                    if (!bodyB) { return; }
                    var point = calculateWorldPosition(e);
                    if (!joint) {
                        var jointDefinition = new Box2D.Dynamics.Joints.b2MouseJointDef();
                        jointDefinition.bodyA = box.world.GetGroundBody();
                        jointDefinition.bodyB = bodyB.body;
                        if (jQuery.inArray(jointDefinition.bodyB, mouseJointArray) == -1) { return; }
                        jointDefinition.target.Set(point.x, point.y);
                        jointDefinition.maxForce = 100000;
                        jointDefinition.timeStep = bodyA.stepAmount;
                        joint = box.world.CreateJoint(jointDefinition);
                    }

                    joint.SetTarget(new b2Vec2(point.x, point.y));
                });

                box.element.addEventListener("mouseup", function (e) {
                    bodyB = null;
                    if (joint) {
                        box.world.DestroyJoint(joint);
                        joint = null;
                    }
                });
            }
            break; //#endregion
        case "revolute"://#region revolute
            def = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
            if (details === undefined || details.x === undefined || details.y === undefined) {
                alert('x,y vals required for revolute joint');
            }
            else {
                def.Initialize(bodyA.body, bodyB.body,
                new b2Vec2(details.x, details.y));
                var joint = box.world.CreateJoint(def);
            }
            break; //#endregion
        case "weld"://#region revolute

            def = new Box2D.Dynamics.Joints.b2WeldJointDef();

            if (details.anchor === undefined)
                details.anchor = { x: 0, y: 0 };

            def.Initialize(bodyA.body, bodyB.body,
            details.anchor);

            var joint = box.world.CreateJoint(def);
            break; //#endregion
        case "prismatic"://#region prismatic
            def = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
            if (details === undefined || details.x1 === undefined || details.y1 === undefined || details.x2 === undefined || details.y2 === undefined) {
                alert('x1,y1,x2,y2 vals required for prismatic joint');
            }
            else {
                def.Initialize(bodyA.body, bodyB.body,
                new b2Vec2(details.x1, details.y1),
                new b2Vec2(details.x2, details.y2));
                def.enableLimit = true;
                def.lowerTranslation = 4;
                def.upperTranslation = 15;
                if (details.lowerTranslation) { def.lowerTranslation = details.lowerTranslation; }
                if (details.upperTranslation) { def.upperTranslation = details.upperTranslation; }
                var joint = box.world.CreateJoint(def);
            }
            break; //#endregion
        case "pulley"://#region pulley
            def = new Box2D.Dynamics.Joints.b2PulleyJointDef();
            if (details === undefined || details.x1 === undefined || details.y1 === undefined || details.x2 === undefined || details.y2 === undefined) {
                alert('x1,y1,x2,y2 vals required for prismatic joint');
            }
            else {
                def.Initialize(bodyA.body, bodyB.body,
                new b2Vec2(details.x1, details.y1),
                new b2Vec2(details.x2, details.y2),
                           bodyA.body.GetWorldCenter(),
                           bodyB.body.GetWorldCenter(),
                           1);
                var joint = box.world.CreateJoint(def);
            }
            break; //#endregion
        case "gear"://#region gear
            var def1 = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
            def1.Initialize(box.world.GetGroundBody(),
                            bodyA.body,
                            bodyA.body.GetWorldCenter());
            var joint1 = box.world.CreateJoint(def1);

            var def2 = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
            def2.Initialize(box.world.GetGroundBody(),
                            bodyB.body,
                            bodyB.body.GetWorldCenter());
            var joint2 = box.world.CreateJoint(def2);

            def = new Box2D.Dynamics.Joints.b2GearJointDef();

            def.bodyA = bodyA;
            def.bodyB = bodyB;

            def.joint1 = joint1;
            def.joint2 = joint2;
            def.ratio = 2;
            var joint = world.CreateJoint(def);
            break; //#endregion
        case "distance"://#region distance
        default:
            var bodyA_Anchor = bodyA.body.GetWorldCenter();
            var bodyB_Anchor = bodyB.body.GetWorldCenter();

            if (details.anchorA_offset) {
                bodyA_Anchor.x += details.anchorA_offset.x;
                bodyA_Anchor.y += details.anchorA_offset.y;
            }
            if (details.anchorB_offset) {
                bodyB_Anchor.x += details.anchorB_offset.x;
                bodyB_Anchor.y += details.anchorB_offset.y;
            }

            if (!details.frequencyHz)
                details.frequencyHz = 0.0;

            if (!details.dampingRatio)
                details.dampingRatio = 0.0;

            var def = new Box2D.Dynamics.Joints.b2DistanceJointDef();
            def.Initialize(bodyA.body, bodyB.body,
            bodyA_Anchor,
            bodyB_Anchor,
            details.frequencyHz,
            details.dampingRatio);
            var joint = box.world.CreateJoint(def);
            break; //#endregion
    }


    if (declaration && declaration.postLoad)
        this.postLoad = declaration(details, true);

    return joint;

};
