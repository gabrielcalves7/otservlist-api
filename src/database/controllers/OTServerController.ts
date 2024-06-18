import OTServer from "@/database/models/OTServer";
interface IOTServerData {
  _id: string,
  name: string,
  url: string,
  location: string,
  creationDate: Date,
  launchDate: Date,
  playersOnline: number,
  ownerName: string,
  status: string,
}
interface IOTServerResponse {
  items: IOTServerData[];
  totalCount: number;
  totalPages: number;
}
export const getAll = async ( page:number = 1, itemsNumber:number = 50 ): Promise<IOTServerResponse> => {
  try {
    const perPage = itemsNumber;
    const skip = (page - 1) * perPage;
    const pipeline = [
      {
        $lookup: {
          from: 'users',
          localField: 'ownerId',
          foreignField: '_id',
          as: 'owner',
        },
      },
      {
        $lookup: {
          from: 'otserverstatuses',
          localField: 'status',
          foreignField: '_id',
          as: 'statusInfo',
        },
      },
      {
        $unwind: '$owner',
      },
      {
        $unwind: '$statusInfo',
      },
      {
        $project: {
          _id: 1,
          name: 1,
          url: 1,
          location: 1,
          creationDate: {
            $dateToString: { format: '%Y-%m-%d', date: '$creationDate' }
          },
          launchDate: {
            $dateToString: { format: '%Y-%m-%d', date: '$launchDate' }
          },
          playersOnline: { $floor: { $multiply: [ { $rand: {} }, 200 + 1 ] } },
          maxPlayersOnline: { $floor: { $multiply: [ { $rand: {} }, 400 + 1 ] } },
          ownerName: '$owner.name',
          status: '$statusInfo.name',
          initialRate: 1
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: perPage,
      },
    ];
    
    const items = await OTServer.aggregate(pipeline);
    const totalCount = await OTServer.countDocuments();
    const totalPages = Math.ceil(totalCount / perPage);
    console.log(page,itemsNumber,"total",totalCount,totalPages);
    console.log(totalCount,totalPages);
    console.log(items.length);
    return { items, totalCount, totalPages };
  } catch (error) {
    console.error('Error fetching OTServers:', error);
    throw new Error('Error fetching OTServers');
  }
}
