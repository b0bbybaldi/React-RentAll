module.exports = function(sequelize, DataTypes) {
    var Rental = sequelize.define("Rentals",{
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        total_cost: {
            type: DataTypes.DECIMAL(12,2),
            allowNull: false 
        }
    });

    Rental.associate = function(models){
        Rental.belongsTo(models.Accounts, {foreignKey: "renter_id"});
    }

     Rental.associate = function(models){
        Rental.belongsTo(models.Items, {foreignKey: "items_id"});
    }

    return Rental;
}