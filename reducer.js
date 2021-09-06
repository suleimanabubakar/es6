const object = [ 
    { Phase: "Phase 1", Step: "Step 1", Task: "Task 1", Value: "5" },
    { Phase: "Phase 1", Step: "Step 1", Task: "Task 2", Value: "10" },
    { Phase: "Phase 1", Step: "Step 2", Task: "Task 1", Value: "15" },
    { Phase: "Phase 1", Step: "Step 2", Task: "Task 2", Value: "20" },
    { Phase: "Phase 2", Step: "Step 1", Task: "Task 1", Value: "25" },
    { Phase: "Phase 2", Step: "Step 1", Task: "Task 2", Value: "30" },
    { Phase: "Phase 2", Step: "Step 2", Task: "Task 1", Value: "35" },
    { Phase: "Phase 2", Step: "Step 2", Task: "Task 2", Value: "40" }
]

const delivery = {
    "id": 21,
    "driver_name": "Hamisi Arkaan",
    "plate_no": "KMTC 333D",
    "orders": [
      {
        "id": 34,
        "products": [
          {
            "id": 54,
            "product_name": "Long Bread",
            "total": 600,
            "quantity": 10,
            "price": "60.00",
            "order": 34,
            "product": 63
          },
          {
            "id": 55,
            "product_name": "Small Bread",
            "total": 225,
            "quantity": 5,
            "price": "45.00",
            "order": 34,
            "product": 62
          }
        ],
        "customer_details": {
          "id": 2,
          "name": "Kiti Kalumanzira",
          "email": "kiti@tmflimited.co.ke",
          "company": "Kiti Logs",
          "location": "Mombasa",
          "phone": 74444331,
          "joined_at": "2021-08-07",
          "status": "active",
          "user": 4
        },
        "totals": 825,
        "ordered_at": "2021-09-01T19:58:04.513685+03:00",
        "status": "active",
        "customer": 2,
        "distribution": 43,
        "delivery": 21
      },
      {
        "id": 36,
        "products": [
          {
            "id": 58,
            "product_name": "Small Bread",
            "total": 180,
            "quantity": 4,
            "price": "45.00",
            "order": 36,
            "product": 62
          }
        ],
        "customer_details": {
          "id": 1,
          "name": "Suleiman Abubakar",
          "email": "s@g.com",
          "company": "TMFLimited",
          "location": "Mombasa",
          "phone": 780656360,
          "joined_at": "2021-08-07",
          "status": "active",
          "user": 3
        },
        "totals": 180,
        "ordered_at": "2021-09-02T14:41:47.945409+03:00",
        "status": "active",
        "customer": 1,
        "distribution": 43,
        "delivery": 21
      },
      {
        "id": 37,
        "products": [
          {
            "id": 59,
            "product_name": "Small Bread",
            "total": 405,
            "quantity": 9,
            "price": "45.00",
            "order": 37,
            "product": 62
          },
          {
            "id": 60,
            "product_name": "Long Bread",
            "total": 300,
            "quantity": 5,
            "price": "60.00",
            "order": 37,
            "product": 63
          }
        ],
        "customer_details": {
          "id": 1,
          "name": "Suleiman Abubakar",
          "email": "s@g.com",
          "company": "TMFLimited",
          "location": "Mombasa",
          "phone": 780656360,
          "joined_at": "2021-08-07",
          "status": "active",
          "user": 3
        },
        "totals": 705,
        "ordered_at": "2021-09-04T07:15:11.349526+03:00",
        "status": "active",
        "customer": 1,
        "distribution": 43,
        "delivery": 21
      }
    ],
    "total": 1710,
    "created_at": "2021-09-01T19:57:44.748711+03:00",
    "status": "active",
    "distribution": 43,
    "driver": 6,
    "vehicle": 2
  }



let result

result = object.reduce((acc,obj)=> {
    return {...acc,[obj.Phase]:(acc[obj.Phase]||0)+1}
},{})


result = object.reduce((acc,obj)=> {
    return {...acc,[obj.Phase]:(acc[obj.Phase] || 0)+parseInt(obj.Value)}
},{})


// function reduceFilter(acc,obj){
//     if (Array.isArray(obj.products)){
//       return obj.products.reduce(reduceFilter,acc)
//     }
   
//     return {...acc,[obj.product_name]:(acc[obj.product_name] || 0)+obj.quantity}
// }


// result = delivery.orders.reduce(reduceFilter,{})

function reduceFilter(acc,obj){
    if (Array.isArray(obj.products)){
      return obj.products.reduce(reduceFilter,acc)
    }
   
    return [...acc,{"product":obj.product_name,"quantity":(acc["product"]===obj.product_name || 0)+obj.quantity}]
}


let obs = delivery.orders.reduce(reduceFilter,[])

function furtherReduce(acc,obj){
  if (acc.find(x=>x.product==obj.product)){
    acc.find(x=>x.product==obj.product).quantity+=obj.quantity
     return [...acc]
  }else{
    return [...acc,{'product':obj.product,'quantity':obj.quantity}]
  }

}


result = delivery.orders.reduce(reduceFilter,[]).reduce(furtherReduce,[])




// result.map((key,value)=>{
//   console.log(`${key} was ${value}` )
// })


console.log(result)