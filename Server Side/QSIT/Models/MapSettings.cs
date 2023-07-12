namespace QSIT.Models
{
public class MapSettings
    {

        public int ID { get; set; }
        public string? MapType { get; set; }
        public string? MapSubType { get; set; }
        public float ClusterRadius { get; set; }
        public bool GeoFencing { get; set; }
        public float TimeBuffer { get; set; }
        public float LocationBuffer { get; set; }
        public float Duration { get; set; }
    }
}
